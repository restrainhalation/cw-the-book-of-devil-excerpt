import { Title, Grid, GridCol, Skeleton, Container } from '@mantine/core';

export default function Index() {
  return (
    <>
      <Title ta="center" mt={50}>
        タイトル
      </Title>
      <Container my="md">
        <Grid>
          <GridCol span={{ base: 12, xs: 6 }}>
            <Skeleton height={70} radius="md" animate={false} my={20} />
            <Skeleton height={90} radius="md" animate={false} my={20} />
            <Skeleton height={140} radius="md" animate={false} my={20} />
          </GridCol>
          <GridCol span={{ base: 12, xs: 6 }}>
            <Skeleton height={340} radius="md" animate={false} my={20} />
          </GridCol>
        </Grid>
      </Container>
    </>
  );
}
