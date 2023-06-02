from flask import Flask ,request , jsonify
from elasticsearch import Elasticsearch
from werkzeug.middleware.profiler import ProfilerMiddleware

app=Flask(__name__)

class ExcludePostProfilerMiddleware:
    def __init__(self, app, profile_dir):
        self.app = app
        self.profiler_middleware = ProfilerMiddleware(self.app, profile_dir=profile_dir)

    def __call__(self, environ, start_response):
        if environ["REQUEST_METHOD"] == "POST":
            return self.app(environ, start_response)
        return self.profiler_middleware(environ, start_response)
app.wsgi_app = ExcludePostProfilerMiddleware(app.wsgi_app, profile_dir='./profile')


es = Elasticsearch(hosts=["http://localhost:9200"])

## THIS IS THE OCE TO CREATE INDEX IN THE ELASTC SEARCH AND LOAD THE DATA IN IT

index_name = 'product_index'  # Choose a suitable index name

# mapping = {
#     'properties': {
#         'product_id': {'type': 'integer'},
#         'product_name': {'type': 'text'}
#     }
# }

# es.indices.create(index=index_name, ignore=400)
# es.indices.put_mapping(index=index_name, body=mapping)

# def index_product(product_id, product_name):
#     document = {
#         'product_id': product_id,
#         'product_name': product_name
#     }
#     es.index(index=index_name, body=document, id=product_id)

@app.route('/search', methods=['POST'])
def search():
    req=request.get_json()
    data=req["keyword"].lower()
    body = {
        'query': {
            'match': {
                'product_name': data
            }
        }
    }
    response = es.search(index=index_name, body=body)
    hits = response['hits']['hits']
    products=[]
    for hit in hits:
        products.append(hit['_source']['product_name'])
    return jsonify({"products":products})


if __name__ == "__main__":
    app.run(host="0.0.0.0",port=int("3000"),debug=True)

