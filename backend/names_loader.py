import csv

def _load_names(names_csv_path):
    names = []
    with open(names_csv_path) as csv_file:
        for row in csv.reader(csv_file):
            names.append(row[0])

    return names


def _group_names(names):
    # TODO: actually do the grouping
    return { "all": names }


def get_names(names_csv_path):
    names = _load_names(names_csv_path)
    return _group_names(names)
