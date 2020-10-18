from flask import Flask, make_response
from flask import render_template, redirect, url_for
from flask import request
import json
import urllib.parse

app = Flask(__name__)


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
    return render_template("portfolio.html", **texts)


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
