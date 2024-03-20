from flask import Flask, request
from markupsafe import escape
from flask import render_template
from elasticsearch import Elasticsearch
import math

ELASTIC_PASSWORD = "2002Eulb!"

es = Elasticsearch("https://localhost:9200", http_auth=("elastic", ELASTIC_PASSWORD), verify_certs=False)
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search')
def search():
    page_size = 10
    keyword = request.args.get('keyword')
    if request.args.get('page'):
        page_no = int(request.args.get('page'))
    else:
        page_no = 1

    body = {
        'size': page_size,
        'from': page_size * (page_no - 1),
        'query': {
            'function_score': {
                'query': {
                    'bool': {
                        'should': [
                            {
                                'multi_match': { #one or multiple word query
                                    'query': keyword,
                                    'fields': ['title', 'overview', 'plot', 'poster_path', 'genre_names', 'Starrring',
                                               'film_year', 'original_language', 'Director']
                                }
                            },
                            {
                                'fuzzy': { #partial match in title field
                                    'title': {
                                        'value': keyword,
                                        'fuzziness': 'AUTO',
                                        'max_expansions': 50,
                                    }
                                }
                            },
                            {
                                'fuzzy': { #partial match in overview field
                                    'overview': {
                                        'value': keyword,
                                        'fuzziness': 'AUTO',
                                        'max_expansions': 50,
                                    }
                                }
                            },
                            {
                                'fuzzy': { #partial match in plot field
                                    'plot': {
                                        'value': keyword,
                                        'fuzziness': 'AUTO',
                                        'max_expansions': 50,
                                    }
                                }
                            }
                        ]
                    }
                },
                'functions': [
                    {
                        'filter': {
                            'fuzzy': {
                                'overview': {
                                    'value': keyword,
                                    'fuzziness': 'AUTO',
                                    'max_expansions': 50,
                                }
                            }
                        },
                        'weight': 1.5
                    },
                    {
                        'filter': {
                            'fuzzy': {
                                'plot': {
                                    'value': keyword,
                                    'fuzziness': 'AUTO',
                                    'max_expansions': 50,
                                }
                            }
                        },
                        'weight': 2
                    }
                    
                ], #function for ranking documents
                'score_mode': 'multiply'
            }
        }
    }


    res = es.search(index='horrormov', body=body)
    hits = [{'title': doc['_source']['title'], 'overview': doc['_source']['overview']
    , 'plot': doc['_source']['plot'], 'film_year': doc['_source']['film_year'],'poster_path': doc['_source']['poster_path'],'genre_names': doc['_source']['genre_names'],'Starring': doc['_source']['Starring'],'Director': doc['_source']['Director'],'original_language': doc['_source']['original_language']} for doc in res['hits']['hits']]
    page_total = math.ceil(res['hits']['total']['value']/page_size)
    return render_template('search.html',keyword=keyword, hits=hits, page_no=page_no, page_total=page_total)