import { useState } from 'react';
import styled from 'styled-components';

const DirectoryListItemName = styled.span`
  margin-right: 8px;
`;

const DirectoryListItemControls = styled.span`

`;

type Props = {
  item: string,
  directory: string,
  addItemToNewDirectory: (item: string, directory: string, newDirectory: string) => void,
};


export default function DirectoryListItem({ item, directory, addItemToNewDirectory }: Props) {
  const [newDirectoryName, setNewDirectoryName] = useState(null);
  const moveDirectory = () => {
    addItemToNewDirectory(item, directory, newDirectoryName.trim());
  };

  return (
    <li>
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
    </li>
  );
}
