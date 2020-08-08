
def _add_to_trie(string, root_node):
    str_length = len(string)
    node = root_node
    for i in range(str_length):
        character = string[i]
        is_teriminator = i == str_length - 1
        child_node = node.get_child(character)
        if child_node == None:
            child_node = TrieNode(character, is_teriminator)
            node.add_child(child_node)

        node = child_node


def build_trie(strings):
    root_node = TrieNode('', False)

    for string in strings:
        _add_to_trie(string, root_node)

    return root_node


class TrieNode:
    def __init__(self, character, is_teriminator):
        self.character = character
        self.is_teriminator = is_teriminator
        self.children = []

    def add_child(self, child_node):
        self.children.append(child_node)

    def has_child(self, child_character):
        return self.get_child(child_character) != None

    def is_leaf(self):
        return len(self.children) == 0

    def get_child(self, child_character):
        for child in self.children:
            if child.character == child_character:
                return child

        return None
