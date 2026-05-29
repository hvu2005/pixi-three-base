export const COLLISION_LAYER = Object.freeze({
	PLAYER: 0x0001,
	ENEMY: 0x0002,
	BULLET: 0x0004,
	BULLET_ENEMY: 0x0008,
	ITEM: 0x0010,
});

export const COLLISION_MASK = Object.freeze({
	PLAYER: COLLISION_LAYER.ITEM | COLLISION_LAYER.BULLET_ENEMY,
	ENEMY: COLLISION_LAYER.BULLET,
	BULLET: COLLISION_LAYER.ENEMY,
	BULLET_ENEMY: COLLISION_LAYER.PLAYER,
	ITEM: COLLISION_LAYER.PLAYER,
});

/**
 * @param {keyof typeof COLLISION_LAYER} layerKey
 */
export function createCollisionFilter(layerKey) {
	const category = COLLISION_LAYER[layerKey];
	const mask = COLLISION_MASK[layerKey];

	if (category == null || mask == null) {
		throw new Error(`Unknown collision layer: ${layerKey}`);
	}

	return {
		category,
		mask,
	};
}
