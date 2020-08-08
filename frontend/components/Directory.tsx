import { useState } from 'react';
import styled from 'styled-components';

import DirectoryListItem from './DirectoryListItem';

const DirectoryWrapper = styled.div`
  border: 1px solid black;
  padding: 8px;
`;

const DirectoryTitle = styled.h1`
  margin: 4px;
`;

const DirectoryList = styled.ul`

`;

type Props = {
  directory: string,
  items: string[],
  addItemToNewDirectory: (item: string, directory: string, newDirectory: string) => void,
};

export default function Directory(props: Props) {
  const { directory, addItemToNewDirectory } = props;

  const [items, setItems] = useState(props.items);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <DirectoryWrapper>
      <DirectoryTitle>{props.directory} ({items.length})</DirectoryTitle>
      <button onClick={toggleIsExpanded}>{isExpanded ? 'Collapse' : 'Expand'}</button>
      {isExpanded && <DirectoryList>
        {items.map((item) => {
          return (
            <DirectoryListItem
              key={item}
              directory={directory}
              item={item}
              addItemToNewDirectory={addItemToNewDirectory}
            />
          );
        })}
      </DirectoryList>
    }
    </DirectoryWrapper>
  );
}
