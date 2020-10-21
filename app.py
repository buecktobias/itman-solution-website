import random

import nltk
from flask import Flask, make_response
from flask import render_template, redirect, url_for
from flask import request
import json
import tensorflow as tf
from nltk.tokenize import word_tokenize # we need to import nltk
import pandas as pd

app = Flask(__name__)

punkt = nltk.download('punkt')
model = tf.keras.models.load_model("model2")

with open("important_words.txt", "r") as f:
    important_words = f.read().split("&")

def get_languages():
    return ["de", "en"]


def get_default_language():
    return "en"


def get_texts(language_code):
    with open('texts.json') as f:
        language_texts = json.load(f)
    return language_texts.get(language_code)


@app.route("/sitemap/")
def sitemap():
    return redirect(url_for('static', filename="sitemap.xml"))


@app.route('/<language_code>/portfolio/')
def portfolio_page(language_code="de"):
    if language_code not in get_languages():
        return redirect(url_for("portfolio_page", language_code=get_default_language()))
    texts = get_texts(language_code)
    all_ = texts
    all_["lang_code"] = language_code
    all_ = stars(all_, 0)
    return render_template("portfolio.html", **all_)


@app.route("/<language_code>/blogs/")
def blogs(language_code="de"):
    if request.cookies["languageCode"] != language_code:
        return redirect(url_for("blogs", language_code=request.cookies["languageCode"]))
    return "lol"


@app.route("/<language_code>/blogs/nlp-with-trip-advisor-reviews")
def blog_nlp(language_code="de"):
    if language_code != "en":
        return redirect(url_for("blog_nlp", language_code="en"))

    with open('nlp_blog') as f:
        blog = json.load(f)
    blog["lang_code"] = language_code
    return render_template("nlp_blog_2.html", **blog)


@app.route("/draw/")
def draw_game():
    return render_template("draw.html")


@app.route("/draw/save", methods=["POST"])
def draw_game_save():
    data = request.form["data"]
    filename = request.form["filename"]
    with open(f"static/drawings/{filename}.txt", "w") as f:
        f.write(data)
    return render_template("draw.html")


@app.route("/trip_advisor/stars/", methods=["POST", "GET"])
def stars_api():
    text = request.form["text"]
    amount_stars = predict_texts_rating(text, important_words, model)
    d = {}
    d = stars(d, amount_stars)
    return ";".join(d.values())


def stars(dictionary, count):
    star_string = "star"
    color_class = "text-warning"
    classes = list([color_class for _ in range(count)]) + list(["" for i in range(10)])
    for i in range(1, 8):
        dictionary[star_string + str(i)] = classes[i-1]
    return dictionary


@app.route('/')
def home():
    if "languageCode" in request.cookies:
        return redirect(url_for("portfolio_page", language_code=request.cookies["languageCode"]))
    try:
        best_language = request.accept_languages.best_match(get_languages())
    except:
        best_language = "de"
    resp = make_response(redirect("#"))
    resp.set_cookie('languageCode', best_language)
    return resp


def get_unique_words_sample(words, sample_size):
    all_words = []
    for ws in words:
        all_words.extend(ws)
    all_unique_words = list(set(all_words))
    word_sample = all_words[:sample_size]
    return word_sample, list(set(word_sample))


# %% [code]
def count_words(words, sample_size):
    count_word = {}
    word_sample, unique_words_sample = get_unique_words_sample(words, sample_size)
    for i, word in enumerate(unique_words_sample):
        count_word[word] = word_sample.count(word)
    return count_word

# %% [code]
def get_most_important_words(words, amount_important_words, sample_size):
    most_used_words = list(map(lambda x: x[0],sorted(count_words(words, sample_size).items(), key= lambda x: x[1], reverse=True)))
    unique_words = list(map(lambda x: set(x), words))
    important_words = most_used_words[:amount_important_words]
    return important_words

# %% [code]
def add_important_words_to_df(df, words, important_words):
    df = df.copy()
    unique_words = list(map(lambda x: set(x), words))
    for i, unique_word in enumerate(important_words):
        df["amount " + unique_word] = list(map(lambda w: int(unique_word in w), unique_words))
    return df

def prediction_value(vector):
    max_value = - 1000
    best_index = 0
    for i, value in enumerate(vector):
        if value > max_value:
            max_value = value
            best_index = i
    return best_index

def predict_texts_rating(text, important_words, model):
    words = word_tokenize(text)
    df = pd.DataFrame()
    new_df = add_important_words_to_df(df, words, important_words)
    X = new_df.values
    y = model.predict(X)
    return prediction_value(y[0]) + 1

if __name__ == '__main__':
    app.run()
