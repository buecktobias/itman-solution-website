from trip_advisor_review import predict_texts_rating
from flask import Flask, make_response
from flask import render_template, redirect, url_for, session
from flask import request
from draw_game import *
import json

app = Flask(__name__)
app.secret_key = "LOLHAHA"


def get_languages():
    return ["de", "en"]


def get_default_language():
    return "en"


def get_texts(language_code):
    with open('portfolio_texts.json') as f:
        language_texts = json.load(f)
    return language_texts.get(language_code)


@app.route("/set_language/?language=<language>")
def set_language(language):
    session["language"] = language
    return redirect(url_for("home"))


@app.route("/blogs/cocktail-database/")
def database_blog():
    return render_template("blogs/cocktail_database.html", blog_title="Cocktail Database", blog_author="Tobias Bück", blog_created="1/11/2020")


@app.before_request
def before_request():
    print("HAHA")
    print(session.keys())
    if "language" not in session.keys() or ("language" in session.keys() and session["language"] not in get_languages()):
        best_language = request.accept_languages.best_match(get_languages())
        session["language"] = best_language

    if "127.0.0.1" not in request.url and request.url.startswith('http://'):
        url = request.url.replace('http://', 'https://', 1)
        code = 301
        return redirect(url, code=code)


@app.route("/sitemap/")
def sitemap():
    return redirect(url_for('static', filename="sitemap.xml"))


@app.route('/<language_code>/portfolio/')
def portfolio_page(language_code="de"):
    language_code = session["language"]
    print(language_code)
    texts = get_texts(language_code)
    all_ = texts
    if language_code is not None:
        all_["lang_code"] = language_code
        all_ = stars(all_, 0)
        return render_template("portfolio/portfolio.html", **all_)
    return ""


@app.route("/<language_code>/blogs/")
def blogs(language_code="de"):
    language_code = session["language"]
    texts = get_texts(language_code)
    all_ = texts
    all_["lang_code"] = language_code
    return render_template("blogs/blogs_overview.html", **all_)


@app.route("/<language_code>/blogs/nlp-with-trip-advisor-reviews")
def blog_nlp(language_code="de"):
    language_code = session["language"]
    if language_code != "en":
        return redirect(url_for("blog_nlp", language_code="en"))
    with open('nlp_blog') as f:
        blog = json.load(f)
    blog["lang_code"] = language_code
    return render_template("blogs/nlp_blog_2.html", **blog)


@app.route("/draw/")
def draw_game():
    return render_template("draw_complete_website.html")


@app.route("/draw/apple/", methods=["POST"])
def draw_game_apple():
    data = request.form["data"]
    if is_apple(data):
        return "Yeah It is an Apple!"
    else:
        return "I do not see an apple! maybe its too small"


@app.route("/trip_advisor/stars/", methods=["POST", "GET"])
def stars_api():
    text = request.form["text"]
    amount_stars = predict_texts_rating(text)
    d = {}
    d = stars(d, amount_stars+1)
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
    return redirect(url_for("portfolio_page", language_code="de"))


if __name__ == '__main__':
    app.run(port=5001)
