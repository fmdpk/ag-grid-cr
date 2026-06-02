import {
  AllCommunityModule,
  LicenseManager,
  ModuleRegistry,
  ValidationModule,
} from 'ag-grid-enterprise';
import { LicenseManager as AgEnterpriseLicense } from 'ag-grid-enterprise';

import { AllEnterpriseModule } from 'ag-grid-enterprise';

// All Enterprise Features, with Integrated Charts and Sparklines
ModuleRegistry.registerModules([AllEnterpriseModule]);
ModuleRegistry.registerModules([AllCommunityModule]);

if (process.env['NODE_ENV'] !== 'production') {
  ModuleRegistry.registerModules([ValidationModule]);
}

export function CrackAgGrid() {
  if (LicenseManager) {
    LicenseManager.prototype.validateLicense = () => true;
    LicenseManager.prototype.isDisplayWatermark = () => false;
  }
  if (AgEnterpriseLicense) {
    AgEnterpriseLicense.prototype.validateLicense = () => true;
    AgEnterpriseLicense.prototype.isDisplayWatermark = () => false;
  }
}

CrackAgGrid();
