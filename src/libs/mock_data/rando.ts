// Quick and dirty seedable random number generator!
// https://stackoverflow.com/a/22313621

export const SeedRandom = (seed: number) => {
  const mod1 = 4294967087;
  const mul1 = 65539;
  const mod2 = 4294965887;
  const mul2 = 65537;
  let state1 = (seed % (mod1 - 1)) + 1;
  let state2 = (seed % (mod2 - 1)) + 1;
  const random = (max: number): number => {
    state1 = (state1 * mul1) % mod1;
    state2 = (state2 * mul2) % mod2;
    if (
      state1 < max &&
      state2 < max &&
      state1 < mod1 % max &&
      state2 < mod2 % max
    ) {
      return random(max);
    }
    return (state1 + state2) % max;
  };
  return random;
};
