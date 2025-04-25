import { ServiceInfo } from '../../interfaces/api.interfaces';
import { AutocoderService } from '../../services/autocoder/autocoder.service';
export declare class InfoController {
    private readonly as;
    constructor(as: AutocoderService);
    get(request: Request): ServiceInfo;
}
