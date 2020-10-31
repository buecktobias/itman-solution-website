import pandas as pd
from nltk import word_tokenize
import nltk
import numpy as np
import pickle
import sklearn

nltk.download('punkt')
def add_important_words_to_df(df, words, important_words):
    df = df.copy()
    unique_words = list(map(lambda x: set(x), words))
    for i, important_word in enumerate(important_words):
        df["amount " + important_word] = list(map(lambda w: int(important_word in w), unique_words))
    return df


def predict_text(model, text, important_words):
    words = word_tokenize(text)
    dataF = pd.DataFrame()
    dataF_words = add_important_words_to_df(dataF, [words], important_words)
    X = np.array(dataF_words.values)
    return model.predict(X)[0]+1


def predict_texts_rating(text):
    with open("pickle_model.pkl", 'rb') as file:
        pickle_model = pickle.load(file)
    with open("important_words.txt", "r") as file:
        important_words = file.read().split(",")
    return predict_text(pickle_model, text, important_words)
