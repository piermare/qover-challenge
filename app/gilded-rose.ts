export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const MIN_QUALITY = 0;
const MAX_QUALITY = 50;

enum ItemType {
  NORMAL = "NORMAL",
  LEGENDARY = "LEGENDARY",
  INCREASING = "INCREASING",
  BACKSTAGE_PASS = "BACKSTAGE_PASS",
}

function ensureBounds(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function applyAdjustment(item: Item, adjustment: number): void {
  item.quality = ensureBounds(item.quality + adjustment, MIN_QUALITY, MAX_QUALITY);
}

function getItemType(item: Item): ItemType {
  if (item.name === "Sulfuras, Hand of Ragnaros") return ItemType.LEGENDARY;
  if (item.name === "Aged Brie") return ItemType.INCREASING;
  if (item.name === "Backstage passes to a TAFKAL80ETC concert") return ItemType.BACKSTAGE_PASS;
  return ItemType.NORMAL;
}

const updateStrategies: Record<ItemType, (item: Item) => void> = {
  [ItemType.LEGENDARY]: updateLegendary,
  [ItemType.INCREASING]: updateIncreasing,
  [ItemType.BACKSTAGE_PASS]: updateBackstagePass,
  [ItemType.NORMAL]: updateNormal,
};

function updateLegendary(_item: Item): void {}

function updateIncreasing(item: Item): void {
  item.sellIn--;
  const adjustment = item.sellIn < 0 ? 2 : 1;
  applyAdjustment(item, adjustment);
}

function updateBackstagePass(item: Item): void {
  item.sellIn--;
  if (item.sellIn < 0) {
    item.quality = MIN_QUALITY;
    return;
  }
  const adjustment = item.sellIn < 5 ? 3 : item.sellIn < 10 ? 2 : 1;
  applyAdjustment(item, adjustment);
}

function updateNormal(item: Item): void {
  item.sellIn--;
  const adjustment = item.sellIn < 0 ? -2 : -1;
  applyAdjustment(item, adjustment);
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      updateStrategies[getItemType(item)](item);
    }
    return this.items;
  }
}
