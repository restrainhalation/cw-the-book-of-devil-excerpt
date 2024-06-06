'use client'

import { Text, Container, ActionIcon, Group, rem, Anchor } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import cx from 'clsx';
import classes from './Footer.module.css';
import { METADATA } from '@/constants'

/** リンクの定義 */
const data = [
  {
    title: 'Original',
    links: [
      { label: 'groupAsk', link: 'http://www.ask.sakura.ne.jp' },
      { label: 'groupAsk official fansite', link: 'https://cardwirth.net' },
      {
        label: '不確定都市',
        link: 'http://www.geocities.co.jp/Playtown/7299/cw/index.html',
        additionalClasses: ['line-through'],
      },
    ],
  },
  {
    title: 'Reference',
    links: [
      { label: '拾穂文庫', link: 'https://chikuan.yokochou.com' },
    ],
  },
];

/**
 * フッターコンポーネント
 * @return {JSX.Element} コンポーネント
 */
export function Footer() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Anchor
        key={index}
        className={cx(classes.link, link.additionalClasses)}
        component="a"
        href={link.link}
        target="_blank"
        rel="noopener"
      >
        {link.label}
      </Anchor>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container size="lg" className={classes.inner}>
        <div className={classes.logo}>
          {METADATA.title}
          <Text size="xs" c="dimmed" className={classes.description}>
            {METADATA.description}
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container size="lg" className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2024 restrainhalation. All rights reserved.
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon
            component="a"
            href="https://github.com/restrainhalation/cw-the-book-of-devil"
            target="_blank"
            rel="noopener"
            size="lg"
            color="gray"
            variant="subtle"
          >
            <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
