from flask import Flask ,request , jsonify
from elasticsearch import Elasticsearch
from werkzeug.middleware.profiler import ProfilerMiddleware
import pickle
import pandas as pd
import json
import os
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



# Create the client instance

#es = Elasticsearch(hosts=["http://localhost:9200"])
#Y3I3SXBZZ0JWRTNEcHpWZU5GOFc6ck5nUnh6ZkVTMG1COU11aUpkZF9tdw==
es = Elasticsearch(
    cloud_id='my_deployment:dXMtZ292LWVhc3QtMS5hd3MuZWxhc3RpYy1jbG91ZC5jb20kODAwNDlkMmYxNTZmNDk0MWJlZjRiNTIyZTE3NDQ5NzkkMjc4MDdlMjllMThhNDc4ZmE2MmQ4MGM1NmI2NzQwN2I=',
    api_key='Y3I3SXBZZ0JWRTNEcHpWZU5GOFc6ck5nUnh6ZkVTMG1COU11aUpkZF9tdw==',
)
## THIS IS THE OCE TO CREATE INDEX IN THE ELASTC SEARCH AND LOAD THE DATA IN IT

index_name = 'products_index'  # Choose a suitable index name

# mapping = {
#     'properties': {
#         'product_id': {'type': 'text'},
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

products = [
    'car',
    'bike',
    'toy',
    'tv',
    'car',
    'Smartphone X10',
    'Smartphone X20',
    'iphone 14',
    'iphone 14 plus',
    'iphone 14 pro',
    'iphone 14 pro max',
    'tv11',
    'bicycle',
    'iPhone 9',
    'Samsung Universe 9',
    'iPhone X',
    'OPPOF19',
    'Huawei P30',
    'iPhone 9',
    'iPhone X',
    'Samsung Universe 9',
    'Huawei P30',
    'OPPOF19',
    'MacBook Pro',
    'Samsung Galaxy Book',
    'Microsoft Surface Laptop 4',
    'perfume Oil',
    'Tree Oil 30ml',
    'HP Pavilion 15-DK1056WM',
    'Brown Perfume',
    'cereals muesli fruit nuts',
    'Hyaluronic Acid Serum',
    'Plant Hanger For Home',
    'Non-Alcoholic Concentrated Perfume Oil',
    'Fog Scent Xpressio Perfume',
    'iPhone X',
    'Elbow Macaroni - 400 gm',
    'Oil Free Moisturizer 100ml',
    'Gulab Powder 50 Gram',
    'Orange Essence Food Flavou',
    'perfume Oil',
    '- Daal Masoor 500 grams',
    'Skin Beauty Serum.',
    'Infinix INBOOK',
    'Handcraft Chinese style',
    'OPPOF19',
    'Brown Perfume',
    'Flying Wooden Bird',
    'Elbow Macaroni - 400 gm',
    'Tree Oil 30ml',
    'Samsung Galaxy Book',
    'Skin Beauty Serum.',
    'Eau De Perfume Spray',
    'Huawei P30',
    'Non-Alcoholic Concentrated Perfume Oil',
    'Freckle Treatment Cream- 15gm',
    'Handcraft Chinese style',
    '3D Embellishment Art Lamp'
]

# for i in range(len(products)):
#     index_product(i,products[i])
# index_product(1,'product_name')

@app.route('/api/search', methods=['POST'])
def search():
    req=request.get_json()
    data=req["keyword"].lower()
    body = {
    'query': {
        'wildcard': {
            'product_name': {
                'value': '*' + data + '*',
                'boost': 1.0,
                'case_insensitive': True
                }
            }
        }
    }
    response = es.search(index=index_name, body=body)
    hits = response['hits']['hits']
    print(hits)
    products=[]
    ids=[]
    for hit in hits:

      products.append(hit['_source']['product_name'])
      ids.append(hit['_source']['product_id'])
    d = pd.DataFrame({'products': products, 'product_id': ids})
    data = d.to_dict(orient='records')

    # Convert the data to JSON
    json_data = json.dumps(data)
    return json_data


# product_dict = pickle.load(open('product_dict.pkl','rb'))
# df=pd.DataFrame(product_dict)
# df.reset_index(inplace=True)
# for i in range(len(df)):
#   index_product(df["product_id"][i],df["products"][i])


if __name__ == "__main__":
    app.run(host="0.0.0.0",port=int("3000"),debug=True)

