import Head from 'next/head';

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

// TODO: use nicer wrapper component for the tree view

export default function Home({ nameGroupings }: HomeProps) {
  return (
    <ol>
      {Object.keys(nameGroupings).map((nameGroup) => {
        return (
          <li>
            <h2>{nameGroup}</h2>
            <ol>
              {nameGroupings[nameGroup].map((name) => {
                return <li>{name}</li>;
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}
