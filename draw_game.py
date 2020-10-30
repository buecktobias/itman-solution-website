import numpy as np
import tensorflow as tf

model = tf.keras.models.load_model("apple_model")


def get_pixel(x, y, matrix, scale):
    x2 = x * scale + scale
    x1 = x * scale
    y2 = y * scale + scale
    y1 = y * scale

    values = []
    for x in range(x1, x2, 1):
        values.extend(matrix[x][y1:y2])

    return sum(values) / len(values)


def scale_down(x_scale, y_scale, old_img, old_img_width, old_img_height):
    new_img_width = round(old_img_width / x_scale)
    new_img_height = round(old_img_height / y_scale)
    new_img = []
    for x in range(new_img_width):
        col = []
        for y in range(new_img_height):
            col.append(get_pixel(x, y, old_img, x_scale))
        new_img.append(col)
    return new_img


def is_apple(image_data):
    values = image_data.split(",")
    image_size = 280
    red_values = values[::4]
    matrix = []
    for i in range(image_size, image_size * image_size + 1, image_size):
        matrix.append(list(map(lambda x: 255 - int(x), red_values[i - image_size: i])))
    new_image = scale_down(10, 10, matrix, image_size, image_size)
    X = np.array([list(map(lambda x: list([i / 255 for i in x]), new_image))])
    X = X.reshape((-1, 28, 28, 1))
    y = np.argmax(model.predict(X), axis=-1)[0]
    if y == 0:
        return True
    return False


if __name__ == '__main__':
    pass