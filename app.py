from trip_advisor_review import predict_texts_rating, important_words, model
from flask import Flask, make_response
from flask import render_template, redirect, url_for
from flask import request
from draw_game import *
import json

app = Flask(__name__)


def get_languages():
    return ["de", "en"]


def get_default_language():
    return "en"


def get_texts(language_code):
    with open('portfolio_texts.json') as f:
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
    return render_template("portfolio/portfolio.html", **all_)


@app.route("/<language_code>/blogs/")
def blogs(language_code="de"):
    if request.cookies["languageCode"] != language_code:
        return redirect(url_for("blogs", language_code=request.cookies["languageCode"]))
    if language_code not in get_languages():
        return redirect(url_for("portfolio_page", language_code=get_default_language()))
    texts = get_texts(language_code)
    all_ = texts
    all_["lang_code"] = language_code
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


@app.route("/draw/apple/", methods=["POST"])
def draw_game_apple():
    data = request.form["data"]
    if is_apple(data):
        return "Yeah It is an Apple!"
    else:
        return "I do not see an apple!"


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


if __name__ == '__main__':
    app.run()
