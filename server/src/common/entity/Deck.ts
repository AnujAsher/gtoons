import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { roll } from '../../util';
import { getCards } from '../../cards/utils';
import User from './User';

@Entity()
export default class Deck extends BaseEntity {
  /*
   */
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => User, { eager: true })
  @JoinColumn()
  player: User;

  @Column()
  name: string;

  @Column()
  cards: string;

  @Column()
  face: number;

  toJson = () => {
    const { id, player, name, cards, face } = this;
    return {
      id,
      player: player.toJson(),
      name,
      cards: JSON.parse(cards) as number[],
      face,
    };
  };

  shuffle = (): number[] => {
    let cards = [...this.toJson().cards];
    const shuffled = [];

    for (let i = cards.length - 1; i >= 0; i--) {
      const index = roll(0, i);
      const cardId = cards[index];
      const coinFlip = !!roll(0, 1);

      if (coinFlip) {
        shuffled.unshift(cardId);
      } else {
        shuffled.push(cardId);
      }
      cards.splice(index, 1);
    }
    return shuffled;
  };

  static getCardModels = (cardIds: number[]) => {
    return getCards(cardIds);
  };

  static cut = (cards: number[]): number[] => {
    const revealed = roll(0, 11);
    const top = cards.slice(0, revealed);
    const bottom = revealed === 11 ? [] : cards.slice(revealed, cards.length);

    return [...bottom, ...top];
  };
}
