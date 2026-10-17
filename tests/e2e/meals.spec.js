import { test, expect } from '@playwright/test';

// Deliberately fictional data: tests never request real recipes or remote images.
const meals = [
  { idMeal: '101', strMeal: 'Test Pasta', strIngredient1: 'Tomato', strMeasure1: '2' },
  { idMeal: '102', strMeal: 'Test Soup', strIngredient1: 'Onion', strMeasure1: '1' },
].map(meal => ({
  ...meal,
  strMealThumb: `https://images.test/${meal.idMeal}.jpg`,
  strInstructions: '▢\r\nPrepare ingredients.\r\n\r\nFinish the recipe.',
  strCategory: 'Test category', strArea: 'Test region', strTags: 'Test',
  strYoutube: 'https://www.youtube.com/watch?v=test', strSource: 'https://example.com/recipe',
}));

test.beforeEach(async ({ page }) => {
  await page.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.pathname.startsWith('/test-api/')) {
      let result = meals;
      if (url.pathname.endsWith('lookup.php')) {
        result = meals.filter(meal => meal.idMeal === url.searchParams.get('i'));
      } else if (url.searchParams.has('s')) {
        result = meals.filter(meal => meal.strMeal.toLowerCase().includes(url.searchParams.get('s').toLowerCase()));
      }
      return route.fulfill({ json: { meals: result.length ? result : null } });
    }
    if (url.hostname !== '127.0.0.1') {
      if (route.request().resourceType() === 'image') {
        return route.fulfill({ contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"/>' });
      }
      return route.abort();
    }
    return route.continue();
  });
});

test('search restores the last term and results, and clearing removes it', async ({ page }) => {
  await page.goto('/by-name');
  const search = page.getByPlaceholder('Search for Meals');
  await expect(page.getByText('Type in a name and click Enter/Return', { exact: false })).toBeVisible();
  await search.fill('Pasta');
  await search.press('Enter');
  await expect(page.getByRole('heading', { name: 'Test Pasta', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Favorites', exact: true }).click();
  await page.getByRole('link', { name: 'Search Meals', exact: true }).click();
  await expect(search).toHaveValue('Pasta');
  await page.reload();
  await expect(search).toHaveValue('Pasta');
  await expect(page.getByRole('heading', { name: 'Test Pasta', exact: true })).toBeVisible();
  await search.fill('');
  await search.press('Enter');
  await page.reload();
  await expect(search).toHaveValue('');
  await expect(page.getByRole('heading', { name: 'Test Pasta', exact: true })).toHaveCount(0);
});

test('favorites persist and can be removed without opening the recipe', async ({ page }) => {
  await page.goto('/by-name/Pasta');
  const save = page.getByRole('button', { name: 'Save Test Pasta to favorites' });
  await expect(save).toHaveAttribute('aria-pressed', 'false');
  await save.click();
  await expect(page).toHaveURL(/by-name\/Pasta$/);
  await page.getByRole('link', { name: 'Favorites', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Test Pasta', exact: true })).toBeVisible();
  await page.reload();
  const remove = page.getByRole('button', { name: 'Remove Test Pasta from favorites' });
  await expect(remove).toHaveAttribute('aria-pressed', 'true');
  await remove.click();
  await expect(page.getByText('No favorites yet.', { exact: false })).toBeVisible();
  await page.reload();
  await expect(page.getByText('No favorites yet.', { exact: false })).toBeVisible();
});

test('recipe link opens details with instruction paragraphs and ingredient images', async ({ page }) => {
  await page.goto('/by-name/Pasta');
  await page.getByRole('link', { name: 'Recipes', exact: true }).click();
  await expect(page).toHaveURL(/\/meal\/101$/);
  await expect(page.getByRole('heading', { name: 'Test Pasta', exact: true })).toBeVisible();
  await expect(page.locator('p', { hasText: '▢ Prepare ingredients.' })).toHaveText('▢ Prepare ingredients.');
  await expect(page.locator('p', { hasText: 'Finish the recipe.' })).toHaveText('Finish the recipe.');
  await expect(page.getByRole('list', { name: 'Recipe ingredients' }).getByRole('img', { name: 'Tomato' })).toBeVisible();
});

test('notes enforce 500 characters, persist per recipe, and can be cleared', async ({ page }) => {
  await page.goto('/meal/101');
  const notes = page.getByRole('textbox', { name: 'My Notes' });
  await expect(notes).toHaveValue('');
  await notes.fill('x'.repeat(500));
  await notes.press('End');
  await notes.press('y');
  await expect(notes).toHaveValue('x'.repeat(500));
  await expect(page.getByText('500/500 characters')).toBeVisible();
  await page.reload();
  await expect(notes).toHaveValue('x'.repeat(500));
  await page.goto('/meal/102');
  await expect(notes).toHaveValue('');
  await notes.fill('Soup notes');
  await page.goto('/meal/101');
  await expect(notes).toHaveValue('x'.repeat(500));
  await notes.fill('');
  await page.reload();
  await expect(notes).toHaveValue('');
  await page.goto('/meal/102');
  await expect(notes).toHaveValue('Soup notes');
});
