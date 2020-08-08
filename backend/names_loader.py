import csv

def _load_names(names_csv_path):
    names = []
    with open(names_csv_path) as csv_file:
        for row in csv.reader(csv_file):
            names.append(row[0])

    return names


def _get_name_prefix(name):
    return name.split("_")[0]


def _group_names(names):
    grouped_names = {}

    for name in names:
        prefix = _get_name_prefix(name)
        if prefix not in grouped_names:
            grouped_names[prefix] = []

        grouped_names[prefix].append(name)


    return grouped_names


def get_names(names_csv_path):
    names = _load_names(names_csv_path)
    return _group_names(names)
