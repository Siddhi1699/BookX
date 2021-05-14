from flask import Flask,jsonify,request
from newgenre import build_chart1
from samegenre import improved_hybrid, getBooks
from flask_cors import CORS, cross_origin

app = Flask(__name__)           
CORS(app)  

@app.route("/")                  
def hello():
    print("here")

@app.route("/getGenreRecommendations", methods = ['POST'])    
@cross_origin()              
def getGenreRecommendations():
    if request.method == 'POST' :
        print(request.json['genre'])
        genre = request.json['genre']
        recommendedBooks = build_chart1(genre)
        return jsonify(recommendedBooks)
    return 'Something Went Wrong',400

@app.route("/getBookRecommendations", methods = ['POST'])    
@cross_origin()              
def getBookRecommendations():
    if request.method == 'POST' :
        # print(request.json['title'], request.json['userid'])
        title = request.json['title']
        userid = request.json['userid']
        # print(getBooks())
        recommendedBooks = improved_hybrid(userid, title)
        # print(recommendedBooks)
        return jsonify(recommendedBooks)
    return 'Something Went Wrong',400    

if __name__ == "__main__":        
    app.run(debug=True)                     