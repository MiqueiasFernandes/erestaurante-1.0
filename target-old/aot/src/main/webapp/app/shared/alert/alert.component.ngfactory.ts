/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from '@angular/common';
import * as i2 from '../../../../../../../../src/main/webapp/app/shared/alert/alert.component';
import * as i3 from 'ng-jhipster/src/service/alert.service';
const styles_JhiAlertComponent:any[] = ['.snackbar[_ngcontent-%COMP%] {\n            min-width: 250px;\n            margin-left: -125px;\n            background-color: #333;\n            color: #fff;\n            text-align: center;\n            border-radius: 2px;\n            padding: 16px;\n            position: fixed;\n            z-index: 1;\n            left: 50%;\n            bottom: 30px;\n            -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 1px 5px 0 rgba(0,0,0,0.12),0 3px 1px -2px rgba(0,0,0,0.2);\n            box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 1px 5px 0 rgba(0,0,0,0.12),0 3px 1px -2px rgba(0,0,0,0.2);\n            -webkit-animation: fadein 0.2s, fadeout 0.5s 4.5s;\n            animation: fadein 0.2s, fadeout 0.5s 4.5s;\n        }\n\n        @-webkit-keyframes fadein {\n            from {bottom: 0; opacity: 0;}\n            to {bottom: 30px; opacity: 1;}\n        }\n\n        @keyframes fadein {\n            from {bottom: 0; opacity: 0;}\n            to {bottom: 30px; opacity: 1;}\n        }\n\n        @-webkit-keyframes fadeout {\n            from {bottom: 30px; opacity: 1;}\n            to {bottom: 0; opacity: 0;}\n        }\n\n        @keyframes fadeout {\n            from {bottom: 30px; opacity: 1;}\n            to {bottom: 0; opacity: 0;}\n        }'];
export const RenderType_JhiAlertComponent:i0.RendererType2 = i0.ɵcrt({encapsulation:0,
    styles:styles_JhiAlertComponent,data:{}});
function View_JhiAlertComponent_1(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'div',[['class',
      'snackbar']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),0,'span',([] as any[]),[[8,'innerHTML',
          1]],(null as any),(null as any),(null as any),(null as any)))],(null as any),
      (_ck,_v) => {
        const currVal_0:any = _v.context.$implicit.msg;
        _ck(_v,1,0,currVal_0);
      });
}
export function View_JhiAlertComponent_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵted((null as any),['\n        '])),(_l()(),i0.ɵand(16777216,
      (null as any),(null as any),1,(null as any),View_JhiAlertComponent_1)),i0.ɵdid(802816,
      (null as any),0,i1.NgForOf,[i0.ViewContainerRef,i0.TemplateRef,i0.IterableDiffers],
      {ngForOf:[0,'ngForOf']},(null as any)),(_l()(),i0.ɵted((null as any),['\n    ']))],
      (_ck,_v) => {
        var _co:i2.JhiAlertComponent = _v.component;
        const currVal_0:any = _co.alerts;
        _ck(_v,2,0,currVal_0);
      },(null as any));
}
export function View_JhiAlertComponent_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'jhi-alert',([] as any[]),
      (null as any),(null as any),(null as any),View_JhiAlertComponent_0,RenderType_JhiAlertComponent)),
      i0.ɵdid(245760,(null as any),0,i2.JhiAlertComponent,[i3.JhiAlertService],(null as any),
          (null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const JhiAlertComponentNgFactory:i0.ComponentFactory<i2.JhiAlertComponent> = i0.ɵccf('jhi-alert',
    i2.JhiAlertComponent,View_JhiAlertComponent_Host_0,{},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL2hvbWUvbWZlcm5hbmRlcy9lcmVzdGF1cmFudGUvc3JjL21haW4vd2ViYXBwL2FwcC9zaGFyZWQvYWxlcnQvYWxlcnQuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL2hvbWUvbWZlcm5hbmRlcy9lcmVzdGF1cmFudGUvc3JjL21haW4vd2ViYXBwL2FwcC9zaGFyZWQvYWxlcnQvYWxlcnQuY29tcG9uZW50LnRzIiwibmc6Ly8vaG9tZS9tZmVybmFuZGVzL2VyZXN0YXVyYW50ZS9zcmMvbWFpbi93ZWJhcHAvYXBwL3NoYXJlZC9hbGVydC9hbGVydC5jb21wb25lbnQudHMuSmhpQWxlcnRDb21wb25lbnQuaHRtbCIsIm5nOi8vL2hvbWUvbWZlcm5hbmRlcy9lcmVzdGF1cmFudGUvc3JjL21haW4vd2ViYXBwL2FwcC9zaGFyZWQvYWxlcnQvYWxlcnQuY29tcG9uZW50LnRzLkpoaUFsZXJ0Q29tcG9uZW50X0hvc3QuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgIiwiXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzbmFja2JhclwiICpuZ0Zvcj1cImxldCBhbGVydCBvZiBhbGVydHNcIj48c3BhbiBbaW5uZXJIVE1MXT1cImFsZXJ0Lm1zZ1wiPjwvc3Bhbj48L2Rpdj5cbiAgICAiLCI8amhpLWFsZXJ0PjwvamhpLWFsZXJ0PiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDQ1E7TUFBQTtNQUFtRDtVQUFBOztRQUFNO1FBQU4sV0FBTSxTQUFOOzs7O29CQUQzRCwrQ0FDUTtNQUFBLDhFQUFBO01BQUE7TUFBQSx1Q0FBOEY7OztRQUF4RTtRQUF0QixXQUFzQixTQUF0Qjs7OztvQkNEUjtNQUFBO2FBQUE7VUFBQTtJQUFBOzs7OyJ9
