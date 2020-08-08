import { useState } from 'react';
import styled from 'styled-components';
import Directory from '../components/Directory';

const DirectoryListWrapper = styled.ul`
  list-style-type: none;
`;

type HomeProps = {
  [nameGroup: string]: string[];
};

export async function getStaticProps() {
  const response = await fetch('http://localhost:8000/names');
  // TODO: handle errors

  const result = await response.json();

  return {
    props: {
      nameGroupings: result.names
    }
  };
}

export default function Home({ nameGroupings }: HomeProps) {
  const [directories, setDirectories] = useState(nameGroupings);

  const addItemToNewDirectory = (item: string, directory: string, newDirectory: string) => {
    const newDirectories = {};
    for (const directoryToCopy of Object.keys(directories)) {
      newDirectories[directoryToCopy] = [...directories[directoryToCopy]];
    }

    newDirectories[directory] = newDirectories[directory].filter((otherItem) => item !== otherItem);

    if (typeof newDirectories[newDirectory] !== 'undefined') {
      newDirectories[newDirectory].push(item);
    } else {
      newDirectories[newDirectory] = [item];
    }

    setDirectories(newDirectories);
  };

  return (
    <DirectoryListWrapper>
      {Object.keys(directories).map((directory) => {
        const items = directories[directory] || [];
        // TODO: come up with a better key prop
        return (
          <li key={directory + " " + items.length}>
            <Directory directory={directory} items={items} addItemToNewDirectory={addItemToNewDirectory} />
          </li>
        );
      })}
    </DirectoryListWrapper>
  );
}
