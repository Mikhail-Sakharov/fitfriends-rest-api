import {Entity} from 'src/types/entity.interface';
import {FavoriteGym} from 'src/types/favorite-gym.interface';

export class FavoriteGymsEntity implements FavoriteGym, Entity<FavoriteGym> {
  public gymId: string;
  public userId: string;

  constructor(favoriteGym: FavoriteGym) {
    this.fillEntity(favoriteGym);
  }

  toObject(): FavoriteGym {
    return {...this};
  }
  fillEntity(favoriteGym: FavoriteGym) {
    this.gymId = favoriteGym.gymId;
    this.userId = favoriteGym.userId;
  }
}
