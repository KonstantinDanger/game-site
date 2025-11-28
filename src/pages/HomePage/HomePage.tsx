import { Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <Flex flexDir='column' gap='24px'>
      <h1>Site description</h1>
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi earum quam fugiat
        dicta ad dignissimos ea deleniti eum, pariatur corporis rerum iste culpa ab
        numquam aspernatur a quisquam? Asperiores, tempora. Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Doloribus, alias earum vitae voluptate eius quod ad
        repellat architecto odit itaque! Tempora impedit quae soluta saepe omnis sapiente
        dolores deleniti qui! Nostrum atque quibusdam et aut quidem mollitia delectus qui
        nisi officia, labore fugit maiores, provident doloribus aperiam iusto quae eveniet
        fuga voluptate at dicta suscipit commodi. Earum voluptas eaque eveniet.
      </h3>

      <Button as={Link} to='/players' w='200px'>
        Player List
      </Button>

      <Button as={Link} to='/matches' w='200px'>
        Match List
      </Button>
    </Flex>
  );
}
