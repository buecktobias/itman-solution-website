from flask import Flask
from flask import render_template, redirect, url_for
from flask import request
import json

app = Flask(__name__)


def get_languages():
    return ["de", "en"]


def get_default_language():
    return "de"


def get_texts(language_code):
    with open('texts.json') as f:
        language_texts = json.load(f)
    return language_texts.get(language_code)

@app.route("/sitemap/")
def sitemap():
    return redirect(url_for('static', filename="sitemap.xml"))

@app.route('/<language_code>/portfolio/')
def portfolio_page(language_code):
    if language_code not in get_languages():
        return redirect(url_for("portfolio_page", language_code=get_default_language()))
    texts = get_texts(language_code)
    return render_template("portfolio.html", **texts)


@app.route('/')
def hello_world():
    try:
        best_language = request.accept_languages.best_match(get_languages())
    except:
        best_language = "de"
    return redirect(url_for("portfolio_page", language_code=best_language))


if __name__ == '__main__':
    app.run()
