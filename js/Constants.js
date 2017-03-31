const Constants = {
    KEY_UP_ARROW: 38,
    KEY_DOWN_ARROW: 40,
    KEY_LEFT_ARROW: 37,
    KEY_RIGHT_ARROW: 39,
    KEY_P: 80,
    KEY_SPACE: 32,
    KEY_ENTER:13,
    TIME_WAITING_BEFORЕ_RESTART: 80,
    NINJA_HORIZONTAL_SPEED_RIGHT: 7,
    NINJA_HORIZONTAL_SPEED_LEFT: -7,
    NINJA_INIT_VERTICAL_SPEED_UP: -10,
    NINJA_VERTICAL_SPEED_UP: -6,
    NINJA_SPRITE_FREQUENCY: 7,
    NINJA_GAMEWALKING_LINE: 9,
    NINJA_HorizontalMoving(params) {
        return params * 0.9
    },
    NINJA_VerticalMoving(params) {
        return params + 0.15
    },
    OBSTACLE_INIT_SPEED: -2.5,
    OBSTACLE_SPRITE_FREQUENCY: 10,
    OBSTACLE_TIMES_RANGE: 120,
    OBSTACLE_TIMES_MIN: 100,
    BONUS_HORIZONTAL_SPEED: -2.5,
    BONUS_VERTICAL_SPEED: -5,
    BONUS_sensitivity_bouncing: 30,
    BONUS_VerticalMoving(params) {
        return params + 0.05
    },
    POINT_SCORE_WHEN_successfully_JUMP: 10,
    POINT_SCORE_WHEN_GET_BONUS: 30,
    MUSIC_VOLUME: 0.1,
    TIME_STAY_HIT_KEY: 1000
}