from flask import Flask
from flask import render_template, redirect, url_for
app = Flask(__name__)
from flask import request
import json


def get_languages():
    return ["de", "en"]


def get_texts(language_code):
    with open('texts.json') as f:
        language_texts = json.load(f)
    return language_texts.get(language_code)


def detect_language(accept_language):
    accept_language.split(";")

@app.route('/<language_code>/portfolio/')
def portfolio_page(language_code):
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
