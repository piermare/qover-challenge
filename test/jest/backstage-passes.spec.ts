import { Item, GildedRose } from '@/gilded-rose';
import { BACKSTAGE_PASS, MIN_QUALITY, MAX_QUALITY } from './constants';

describe('Backstage passes', () => {
  it('increases quality by 1 when more than 10 days remaining', () => {
    const items = [new Item(BACKSTAGE_PASS, 15, 20)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(21);
  });

  it('increases quality by 2 when 10 days or less remaining', () => {
    const items = [new Item(BACKSTAGE_PASS, 10, 20)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(22);
  });

  it('increases quality by 3 when 5 days or less remaining', () => {
    const items = [new Item(BACKSTAGE_PASS, 5, 20)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(23);
  });

  it('quality drops to 0 after the concert', () => {
    const items = [new Item(BACKSTAGE_PASS, 0, 20)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(MIN_QUALITY);
  });

  it('decreases sellIn by 1 each day', () => {
    const items = [new Item(BACKSTAGE_PASS, 15, 20)];
    new GildedRose(items).updateQuality();
    expect(items[0].sellIn).toBe(14);
  });

  it('quality never goes above 50', () => {
    const items = [new Item(BACKSTAGE_PASS, 5, MAX_QUALITY - 1)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(MAX_QUALITY);
  });

  it('quality never goes below 0', () => {
    const items = [new Item(BACKSTAGE_PASS, 15, MIN_QUALITY)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(MIN_QUALITY + 1);
  });

  it('sellIn continues to decrement when already negative', () => {
    const items = [new Item(BACKSTAGE_PASS, -1, MIN_QUALITY)];
    new GildedRose(items).updateQuality();
    expect(items[0].sellIn).toBe(-2);
  });
});
