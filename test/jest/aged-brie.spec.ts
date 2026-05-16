import { Item, GildedRose } from '@/gilded-rose';
import { AGED_BRIE, MIN_QUALITY, MAX_QUALITY } from './constants';

describe('Aged Brie', () => {
  it('increases quality by 1 each day', () => {
    const items = [new Item(AGED_BRIE, 5, 10)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(11);
  });

  it('decreases sellIn by 1 each day', () => {
    const items = [new Item(AGED_BRIE, 5, 10)];
    new GildedRose(items).updateQuality();
    expect(items[0].sellIn).toBe(4);
  });

  it('increases quality by 2 once sell-by date has passed', () => {
    const items = [new Item(AGED_BRIE, 0, 10)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(12);
  });

  it('quality never goes above 50', () => {
    const items = [new Item(AGED_BRIE, 5, MAX_QUALITY)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(MAX_QUALITY);
  });

  it('quality is capped at 50 even when incrementing by 2', () => {
    const items = [new Item(AGED_BRIE, 0, MAX_QUALITY - 1)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(MAX_QUALITY);
  });

  it('quality never goes below 0', () => {
    const items = [new Item(AGED_BRIE, 5, MIN_QUALITY)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(MIN_QUALITY + 1);
  });

  it('quality never goes below 0 when sell-by date has passed and instead increases quality by 2', () => {
    const items = [new Item(AGED_BRIE, -1, MIN_QUALITY)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(MIN_QUALITY + 2);
  });

  it('sellIn continues to decrement when already negative', () => {
    const items = [new Item(AGED_BRIE, -1, 10)];
    new GildedRose(items).updateQuality();
    expect(items[0].sellIn).toBe(-2);
  });
});
