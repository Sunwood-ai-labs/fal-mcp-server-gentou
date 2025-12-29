import { test } from 'node:test';
import assert from 'node:assert';
import { GenerateImageSchema } from '../dist/schema.js';

test('GenerateImageSchema validation', async (t) => {
    await t.test('validates correct input', () => {
        const input = {
            prompt: 'A cyberpunk city',
            aspect_ratio: '16:9',
            num_images: 1,
            output_format: 'jpeg'
        };
        const result = GenerateImageSchema.safeParse(input);
        assert.ok(result.success);
    });

    await t.test('uses default values', () => {
        const input = {
            prompt: 'A forest'
        };
        const result = GenerateImageSchema.safeParse(input);
        assert.ok(result.success);
        if (result.success) {
            assert.strictEqual(result.data.aspect_ratio, '1:1');
            assert.strictEqual(result.data.output_format, 'png');
            assert.strictEqual(result.data.num_images, 1);
        }
    });

    await t.test('fails on missing required prompt', () => {
        const input = {
            aspect_ratio: '1:1'
        };
        const result = GenerateImageSchema.safeParse(input);
        assert.strictEqual(result.success, false);
    });

    await t.test('fails on invalid type', () => {
        const input = {
            prompt: 123
        };
        const result = GenerateImageSchema.safeParse(input);
        assert.strictEqual(result.success, false);
    });
});
