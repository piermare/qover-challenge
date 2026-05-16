import { Item, GildedRose } from '@/gilded-rose';

describe('Normal item', () => {
  it('decreases quality by 1 each day', () => {
    const items = [new Item('Elixir of the Mongoose', 5, 10)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(9);
  });

  it('decreases sellIn by 1 each day', () => {
    const items = [new Item('Elixir of the Mongoose', 5, 10)];
    new GildedRose(items).updateQuality();
    expect(items[0].sellIn).toBe(4);
  });

  it('decreases quality by 2 once sell-by date has passed', () => {
    const items = [new Item('Elixir of the Mongoose', 0, 10)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(8);
  });

  it('quality never goes below 0', () => {
    const items = [new Item('Elixir of the Mongoose', 5, 0)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('quality never goes above 50', () => {
    const items = [new Item('Elixir of the Mongoose', 5, 50)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(49);
  });

  it('quality never goes below 0 when sell-by date has passed', () => {
    const items = [new Item('Elixir of the Mongoose', -1, 0)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('sellIn continues to decrement when already negative', () => {
    const items = [new Item('Elixir of the Mongoose', -1, 10)];
    new GildedRose(items).updateQuality();
    expect(items[0].sellIn).toBe(-2);
  });
});
