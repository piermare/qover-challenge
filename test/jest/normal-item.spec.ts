import { Item, GildedRose } from '@/gilded-rose';
import { NORMAL_ITEM, MIN_QUALITY, MAX_QUALITY } from './constants';

describe('Normal item', () => {
  it('decreases quality by 1 each day', () => {
    const items = [new Item(NORMAL_ITEM, 5, 10)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(9);
  });

  it('decreases sellIn by 1 each day', () => {
    const items = [new Item(NORMAL_ITEM, 5, 10)];
    new GildedRose(items).updateQuality();
    expect(items[0].sellIn).toBe(4);
  });

  it('decreases quality by 2 once sell-by date has passed', () => {
    const items = [new Item(NORMAL_ITEM, 0, 10)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(8);
  });

  it('quality never goes below 0', () => {
    const items = [new Item(NORMAL_ITEM, 5, MIN_QUALITY)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(MIN_QUALITY);
  });

  it('quality never goes above 50', () => {
    const items = [new Item(NORMAL_ITEM, 5, MAX_QUALITY)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(MAX_QUALITY - 1);
  });

  it('quality never goes below 0 when sell-by date has passed', () => {
    const items = [new Item(NORMAL_ITEM, -1, MIN_QUALITY)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(MIN_QUALITY);
  });

  it('sellIn continues to decrement when already negative', () => {
    const items = [new Item(NORMAL_ITEM, -1, 10)];
    new GildedRose(items).updateQuality();
    expect(items[0].sellIn).toBe(-2);
  });
});
