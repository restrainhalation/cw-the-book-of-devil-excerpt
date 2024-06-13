'use client'

import React, { FC } from 'react'
import { Blockquote, Container, Modal, Text } from '@mantine/core'
import cx from 'clsx'

/**
 * はじめにモーダルコンポーネントのパラメータ
 * @typedef AbilityTooltipParams
 * @property {boolean} opened モーダルを表示するか
 * @property {() => void} onClose モーダルを閉じる操作をしたときに実行する関数
 */

/**
 * はじめにモーダルコンポーネント
 * @param {IntroductionModalParams} param0 コンポーネントのパラメータ
 * @return {React.FC<IntroductionModalParams>} コンポーネント
 */
export const IntroductionModal: FC<{
  opened: boolean;
  onClose: () => void;
}> = ({ opened, onClose }) => (
    <>
      <Modal.Root opened={opened} onClose={onClose} centered size="xl">
        <Modal.Overlay blur={20} />
        <Modal.Content>
          <Modal.Header px="xl">
            <Modal.Title className={cx('text-xl', 'font-semibold')}>はじめに</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body px="xl">
            <Blockquote color="red" cite="CardWirth シナリオ『悪魔の書』（gulafu 2004：作者から一言）">
              <Text>ＣＷでは徹底的に隠蔽されるのが基本である『数字に関する事』のユーティリティーです。</Text>
              <Text>ある意味で非常に危険なので取り扱いには要注意。</Text>
              <Text>毒にも薬にもなりますが、毒になるような使い方は望みません。</Text>
            </Blockquote>
            <Container my="xl" px={0} lh="xl">
              <Text>本サービスは CardWirth シナリオ『悪魔の書』の手動診断を参考にした機能を提供します。</Text>
              <Text>冒険者登録の要領で各種個性を選ぶと、それらが積み重なった結果である冒険者の能力値が可視化されます。</Text>
              <Text>能力値を秘する CardWirth において、これは秘密を暴き立てることを意味します。</Text>
              <Text>プレイヤーの楽しみを奪い、世界観を壊してしまう恐れがありますので、用法・用量を守って正しくお使い下さい。</Text>
            </Container>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  )
