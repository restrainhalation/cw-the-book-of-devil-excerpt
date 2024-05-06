import {
  Title,
  Grid,
  GridCol,
  Stack,
  Skeleton,
  Container,
} from '@mantine/core';

export default function Index() {
  return (
    <>
      <Title ta="center" mt={50}>
        タイトル
      </Title>
      <Container my="md">
        <Grid>
          <GridCol span={{ base: 12, xs: 6 }}>
            <Stack justify="center">
              <Skeleton height={70} radius="md" animate={false} />
              <Skeleton height={90} radius="md" animate={false} />
              <Skeleton height={140} radius="md" animate={false} />
            </Stack>
          </GridCol>
          <GridCol span={{ base: 12, xs: 6 }}>
            <Skeleton height={340} radius="md" animate={false} />
          </GridCol>
        </Grid>
      </Container>
    </>
  );
}
