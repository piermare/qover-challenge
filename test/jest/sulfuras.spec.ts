import { Item, GildedRose } from '@/gilded-rose';
import { SULFURAS, LEGENDARY_QUALITY } from './constants';

describe('Sulfuras', () => {
  it('never changes quality', () => {
    const items = [new Item(SULFURAS, 0, LEGENDARY_QUALITY)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(LEGENDARY_QUALITY);
  });

  it('never changes sellIn', () => {
    const items = [new Item(SULFURAS, 0, LEGENDARY_QUALITY)];
    new GildedRose(items).updateQuality();
    expect(items[0].sellIn).toBe(0);
  });

  it('never changes quality even with negative sellIn', () => {
    const items = [new Item(SULFURAS, -1, LEGENDARY_QUALITY)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(LEGENDARY_QUALITY);
  });

  it('never changes sellIn even when already negative', () => {
    const items = [new Item(SULFURAS, -1, LEGENDARY_QUALITY)];
    new GildedRose(items).updateQuality();
    expect(items[0].sellIn).toBe(-1);
  });
});
