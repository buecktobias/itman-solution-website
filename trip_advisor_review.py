import tensorflow as tf
from nltk.tokenize import word_tokenize # we need to import nltk
import pandas as pd
import nltk


punkt = nltk.download('punkt')
model = tf.keras.models.load_model("model2")

with open("important_words.txt", "r") as f:
    important_words = f.read().split("&")

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
    text += "hotel"
    words = word_tokenize(text)
    df = pd.DataFrame()
    new_df = add_important_words_to_df(df, words, important_words)
    X = new_df.values
    y = model.predict(X)
    return prediction_value(y[0]) + 1

