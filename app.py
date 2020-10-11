from flask import Flask
from flask import render_template, redirect, url_for
app = Flask(__name__)


@app.route('/de/portfolio/')
def portfolio_page():
    return render_template("german_portfolio.html")


@app.route('/')
def hello_world():
    return redirect(url_for("portfolio_page"))


if __name__ == '__main__':
    app.run()
