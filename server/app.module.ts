import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { ClassProvider } from '@nestjs/common/interfaces';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AngularUniversalModule, applyDomino } from '@nestjs/ng-universal';
import { join } from 'path';

import { BROWSER_CLIENT_DIR, BROWSER_SERVER_DIR } from '@constants';
import { ServicesModule } from './services/services.module';
import { DatabaseModule } from './database/database.module';
import { ModulesModule } from './modules/modules.module';

const browserClientDir = join(process.cwd(), BROWSER_CLIENT_DIR);
const browserServerDir = join(process.cwd(), BROWSER_SERVER_DIR);

applyDomino(global, join(browserClientDir, 'index.html'));

const cacheProvider: ClassProvider = {
  provide: APP_INTERCEPTOR,
  useClass: CacheInterceptor,
};

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      viewsPath: browserClientDir,
      bundle: require(browserServerDir),
    }),
    CacheModule.register(),
    ServicesModule,
    DatabaseModule,
    ModulesModule,
  ],
})
export class AppModule {}
