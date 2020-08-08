import csv

from trie import build_trie

# 1. Build up trie of key names. Mark each node with a boolean denoting whether
#    or not it terminates a key.
# 2. Recursively traverse the trie, accumulating a prefix, until reaching a node
#    That either terminates an entry, or traverse until
# If on a leaf node, traverse up the trie until finding a node with more than
# 1 child, make that the prefix?


def _load_names(names_csv_path):
    names = []
    with open(names_csv_path) as csv_file:
        for row in csv.reader(csv_file):
            names.append(row[0])

    return names


def _get_strings(trie_node, prefix):
    character = trie_node.character
    if trie_node.is_leaf():
        return [prefix + character]

    child_strings = []
    for child_node in trie_node.children:
        child_strings.extend(_get_strings(child_node, prefix + character))

    return child_strings

def _get_groupings(trie_node, prefix, prev_child_strings_count):
    character = trie_node.character
    next_prefix = prefix + character

    child_strings = _get_strings(trie_node, next_prefix)
    groupings = {}

    if trie_node.is_leaf() or trie_node.is_teriminator:
        if next_prefix not in groupings:
            groupings[next_prefix] = []

        groupings[next_prefix].append(next_prefix)

    if len(child_strings) < prev_child_strings_count:
        if next_prefix not in groupings:
            groupings[next_prefix] = []

        groupings[next_prefix].extend(child_strings)


    for child_node in trie_node.children:
        child_groupings = _get_groupings(child_node, next_prefix, len(child_strings))
        for grouping, strings in child_groupings.items():
            if grouping not in groupings:
                groupings[grouping] = []

            # TODO: can this duplicate strings?
            groupings[grouping].extend(strings)

    return groupings


def _group_names(names):
    names_trie = build_trie(names)
    groupings = _get_groupings(names_trie, '', 0)
    print('groupings:', groupings)

    return groupings


def get_names(names_csv_path):
    names = _load_names(names_csv_path)
    return _group_names(names)
