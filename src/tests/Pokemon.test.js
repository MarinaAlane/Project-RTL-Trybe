/*
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
*/

const dummyArray = Array;
dummyArray.prototype.randomElement = function randomElement() {
  return (this.length) ? this[Math.floor(Math.random() * this.length)] : undefined;
};

describe('Tests Pokemon', () => {
  test('', () => {
    expect(1).toBe(1);
  });
});
