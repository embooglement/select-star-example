import { useState } from 'react';
import styled from 'styled-components';

const DirectoryWrapper = styled.div`
  border: 1px solid black;
  padding: 8px;
`;

const DirectoryTitle = styled.h1`
  margin: 4px;
`;

const DirectoryList = styled.ul`

`;

const DirectoryListItem = styled.li`

`;

const DirectoryListItemName = styled.span`
  margin-right: 8px;
`;

const DirectoryListItemControls = styled.span`

`;

type Props = {
  directory: string,
  items: string[],
  addItemToNewDirectory: (item: string, directory: string, newDirectory: string) => void,
};

export default function Directory(props: Props) {
  const [items, setItems] = useState(props.items);

  return (
    <DirectoryWrapper>
      <DirectoryTitle>{props.directory} ({items.length})</DirectoryTitle>
      <DirectoryList>
        {items.map((item) => {
          const [newDirectoryName, setNewDirectoryName] = useState(null);
          const moveDirectory = () => {
            props.addItemToNewDirectory(item, props.directory, newDirectoryName.trim());
          };

          return (
            <DirectoryListItem key={item}>
              <DirectoryListItemName>{item}</DirectoryListItemName>
              <DirectoryListItemControls>
                <input type="text"
                  placeholder="New directory"
                  onChange={(e) => {
                    if (e.target.value) {
                      setNewDirectoryName(e.target.value);
                    }
                  }}
                />
                <button onClick={moveDirectory}>Submit</button>
              </DirectoryListItemControls>
            </DirectoryListItem>
          );
        })}
      </DirectoryList>
    </DirectoryWrapper>
  );
}
