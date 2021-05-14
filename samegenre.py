# from sklearn.metrics.pairwise import linear_kernel, cosine_similarity
# from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
import pandas as pd
# import matplotlib.pyplot as plt
import pickle
# from surprise import Reader, Dataset, SVD
# from surprise.model_selection import cross_validate
# from model import svd
import warnings
warnings.filterwarnings('ignore')

print("line 14")

path1 = "ob.csv"
path2 = "or.csv"
path3 = "obt.csv"
path4 = "ot.csv"

books = pd.read_csv(path1)
ratings = pd.read_csv(path2)
book_tags = pd.read_csv(path3)
tags = pd.read_csv(path4)


def getBooks():
    # df[['A', 'C']].to_numpy()
    return books['title'].to_json()

print(getBooks())

pickle.dump(getBooks(), open("title.json", 'wb'))
# t = pickle.load(open("title.json", 'rb'))

print("line 25")
# books['authors'] = pd.read_csv('books.csv')['authors']
# books.to_csv('ob.csv', columns =books.columns.tolist())

# count = CountVectorizer(analyzer='word', ngram_range=(
#     1, 2), min_df=0, stop_words='english')
# pickle.dump(count, open("count.pk", 'wb'))
# count = pickle.load(open("count.pk", 'rb'))

print("line 30")

# count_matrix = count.fit_transform(books['soup'])
# pickle.dump(count_matrix, open("countmat.pk", 'wb'))
count_matrix = pickle.load(open("countmat.pk", 'rb'))

print("line 36")

# cosine_sim = cosine_similarity(count_matrix, count_matrix)
# pickle.dump(cosine_sim, open("cosineSim.pk", 'wb'))
cosine_sim = pickle.load(open("cosineSim.pk", 'rb'))

print("line 38")
indices = pd.Series(books.index, index=books['title'])
titles = books['title']
print("line 41")

# def get_recommendations(title, n=9):
    # title1 = list(books.title[books.title.str.lower().str.contains("fiction") == True].values)
    # print("THIS IS ", title1)
    # idx = indices[title1]
    # sim_scores = list(enumerate(cosine_sim[idx]))
    # sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    # sim_scores = sim_scores[1:31]
    # book_indices = [i[0] for i in sim_scores]
    # return title1

filename = 'model.sav'
loadedMod = pickle.load(open(filename, 'rb'))

def improved_hybrid(user_id, title, n=9):
    # title = get_recommendations(title)[1]
    idx = indices[title]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:51]
    book_indices = [i[0] for i in sim_scores]

    df = books.iloc[book_indices][['book_id', 'image_url', 'authors', 'title',
                                   'ratings_count', 'average_rating', 'original_publication_year']]
    v = df['ratings_count']
    m = df['ratings_count'].quantile(0.60)
    R = df['average_rating']
    C = df['average_rating'].mean()
    df['weighted_rating'] = (R*v + C*m) / (v + m)

    df['est'] = df['book_id'].apply(lambda x: loadedMod.predict(user_id, x).est)

    df['score'] = (df['est'] + df['weighted_rating']) / 2
    df = df.sort_values('score', ascending=False)
    output = df[[ 'title','authors','original_publication_year','average_rating','ratings_count','book_id', 'score','image_url']].head(n)

                #  'work_text_reviews_count','weighted_rating','image_url'

    return output.values.tolist()



# print(improved_hybrid(4, "Twilight (Twilight, #1)"))


