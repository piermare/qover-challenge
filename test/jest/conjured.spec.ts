import { Item, GildedRose } from '@/gilded-rose';
import { MIN_QUALITY, MAX_QUALITY } from './constants';

describe('Conjured', () => {
  it('decreases quality by 2 each day', () => {
    const items = [new Item('Conjured Mana Cake', 5, 10)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(8);
  });

  it('decreases quality by 4 once sell-by date has passed', () => {
    const items = [new Item('Conjured Mana Cake', 0, 10)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(6);
  });

  it('decreases sellIn by 1 each day', () => {
    const items = [new Item('Conjured Mana Cake', 5, 10)];
    new GildedRose(items).updateQuality();
    expect(items[0].sellIn).toBe(4);
  });

  it('quality never goes below 0', () => {
    const items = [new Item('Conjured Mana Cake', 5, MIN_QUALITY)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(MIN_QUALITY);
  });

  it('quality never goes below 0 when sell-by date has passed', () => {
    const items = [new Item('Conjured Mana Cake', -1, 1)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(MIN_QUALITY);
  });

  it('quality never goes above 50', () => {
    const items = [new Item('Conjured Mana Cake', 5, MAX_QUALITY)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(MAX_QUALITY - 2);
  });

  it('sellIn continues to decrement when already negative', () => {
    const items = [new Item('Conjured Mana Cake', -1, 10)];
    new GildedRose(items).updateQuality();
    expect(items[0].sellIn).toBe(-2);
  });
});
