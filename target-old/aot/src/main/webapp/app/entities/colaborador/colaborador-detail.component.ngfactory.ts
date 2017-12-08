/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from '@angular/router';
import * as i2 from '@angular/common';
import * as i3 from '../../../../../../node_modules/ng-jhipster/src/language/jhi-translate.directive.ngfactory';
import * as i4 from 'ng-jhipster/src/language/jhi-translate.directive';
import * as i5 from '../../shared/alert/alert-error.component.ngfactory';
import * as i6 from '../../../../../../../../src/main/webapp/app/shared/alert/alert-error.component';
import * as i7 from 'ng-jhipster/src/service/alert.service';
import * as i8 from 'ng-jhipster/src/service/event-manager.service';
import * as i9 from '@ngx-translate/core/src/translate.service';
import * as i10 from '../../../../../../../../src/main/webapp/app/entities/colaborador/colaborador-detail.component';
import * as i11 from 'ng-jhipster/src/service/data-util.service';
import * as i12 from '../../../../../../../../src/main/webapp/app/entities/colaborador/colaborador.service';
const styles_ColaboradorDetailComponent:any[] = ([] as any[]);
export const RenderType_ColaboradorDetailComponent:i0.RendererType2 = i0.ɵcrt({encapsulation:2,
    styles:styles_ColaboradorDetailComponent,data:{}});
function View_ColaboradorDetailComponent_2(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),6,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i0.ɵted((null as any),[' '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
      3,'a',([] as any[]),[[1,'target',0],[8,'href',4]],[[(null as any),'click']],
      (_v,en,$event) => {
        var ad:boolean = true;
        if (('click' === en)) {
          const pd_0:any = ((<any>i0.ɵnov(_v,3).onClick($event.button,$event.ctrlKey,
              $event.metaKey,$event.shiftKey)) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any))),i0.ɵdid(671744,(null as any),0,i1.RouterLinkWithHref,
      [i1.Router,i1.ActivatedRoute,i2.LocationStrategy],{routerLink:[0,'routerLink']},
      (null as any)),i0.ɵpad(2),(_l()(),i0.ɵted((null as any),['',''])),(_l()(),i0.ɵted((null as any),
      [' ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_2:any = _ck(_v,4,0,'/endereco',((_co.colaborador.endereco == null)? (null as any): _co.colaborador.endereco.id));
    _ck(_v,3,0,currVal_2);
  },(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = i0.ɵnov(_v,3).target;
    const currVal_1:any = i0.ɵnov(_v,3).href;
    _ck(_v,2,0,currVal_0,currVal_1);
    const currVal_3:any = ((_co.colaborador.endereco == null)? (null as any): _co.colaborador.endereco.id);
    _ck(_v,5,0,currVal_3);
  });
}
function View_ColaboradorDetailComponent_3(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),6,'span',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i0.ɵted((null as any),[' '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
      3,'a',([] as any[]),[[1,'target',0],[8,'href',4]],[[(null as any),'click']],
      (_v,en,$event) => {
        var ad:boolean = true;
        if (('click' === en)) {
          const pd_0:any = ((<any>i0.ɵnov(_v,3).onClick($event.button,$event.ctrlKey,
              $event.metaKey,$event.shiftKey)) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any))),i0.ɵdid(671744,(null as any),0,i1.RouterLinkWithHref,
      [i1.Router,i1.ActivatedRoute,i2.LocationStrategy],{routerLink:[0,'routerLink']},
      (null as any)),i0.ɵpad(2),(_l()(),i0.ɵted((null as any),['',''])),(_l()(),i0.ɵted((null as any),
      ['',' ']))],(_ck,_v) => {
    const currVal_2:any = _ck(_v,4,0,'/cargo',((_v.context.$implicit == null)? (null as any): _v.context.$implicit.id));
    _ck(_v,3,0,currVal_2);
  },(_ck,_v) => {
    const currVal_0:any = i0.ɵnov(_v,3).target;
    const currVal_1:any = i0.ɵnov(_v,3).href;
    _ck(_v,2,0,currVal_0,currVal_1);
    const currVal_3:any = _v.context.$implicit.id;
    _ck(_v,5,0,currVal_3);
    const currVal_4:any = (_v.context.last? '': ', ');
    _ck(_v,6,0,currVal_4);
  });
}
function View_ColaboradorDetailComponent_1(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),156,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i0.ɵted((null as any),[' '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
      4,'h2',([] as any[]),(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i0.ɵeld(0,(null as any),(null as any),2,'span',[['jhiTranslate',
      'eRestauranteApp.colaborador.detail.title']],(null as any),(null as any),(null as any),
      i3.View_JhiTranslateComponent_0,i3.RenderType_JhiTranslateComponent)),i0.ɵdid(49152,
      (null as any),0,i4.JhiTranslateComponent,([] as any[]),{jhiTranslate:[0,'jhiTranslate']},
      (null as any)),(_l()(),i0.ɵted((null as any),['Colaborador'])),(_l()(),i0.ɵted((null as any),
      [' ',''])),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵeld(0,(null as any),
      (null as any),0,'hr',([] as any[]),(null as any),(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),
      i0.ɵeld(0,(null as any),(null as any),1,'jhi-alert-error',([] as any[]),(null as any),
          (null as any),(null as any),i5.View_JhiAlertErrorComponent_0,i5.RenderType_JhiAlertErrorComponent)),
      i0.ɵdid(180224,(null as any),0,i6.JhiAlertErrorComponent,[i7.JhiAlertService,
          i8.JhiEventManager,i9.TranslateService],(null as any),(null as any)),(_l()(),
          i0.ɵted((null as any),[' '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
          120,'dl',[['class','row-md jh-entity-details']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          [' '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),3,'dt',([] as any[]),
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),2,'span',[['jhiTranslate','eRestauranteApp.colaborador.nome']],
          (null as any),(null as any),(null as any),i3.View_JhiTranslateComponent_0,
          i3.RenderType_JhiTranslateComponent)),i0.ɵdid(49152,(null as any),0,i4.JhiTranslateComponent,
          ([] as any[]),{jhiTranslate:[0,'jhiTranslate']},(null as any)),(_l()(),i0.ɵted((null as any),
          ['Nome'])),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),4,'dd',([] as any[]),(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),
          i0.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),(null as any),
              (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['',''])),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵted((null as any),
          [' '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),3,'dt',([] as any[]),
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),2,'span',[['jhiTranslate','eRestauranteApp.colaborador.nascimento']],
          (null as any),(null as any),(null as any),i3.View_JhiTranslateComponent_0,
          i3.RenderType_JhiTranslateComponent)),i0.ɵdid(49152,(null as any),0,i4.JhiTranslateComponent,
          ([] as any[]),{jhiTranslate:[0,'jhiTranslate']},(null as any)),(_l()(),i0.ɵted((null as any),
          ['Nascimento'])),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵeld(0,
          (null as any),(null as any),5,'dd',([] as any[]),(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          [' '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),2,'span',([] as any[]),
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['',''])),i0.ɵppd(2),(_l()(),i0.ɵted((null as any),
          [' '])),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),3,'dt',([] as any[]),(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i0.ɵeld(0,(null as any),(null as any),
          2,'span',[['jhiTranslate','eRestauranteApp.colaborador.sexomasculino']],
          (null as any),(null as any),(null as any),i3.View_JhiTranslateComponent_0,
          i3.RenderType_JhiTranslateComponent)),i0.ɵdid(49152,(null as any),0,i4.JhiTranslateComponent,
          ([] as any[]),{jhiTranslate:[0,'jhiTranslate']},(null as any)),(_l()(),i0.ɵted((null as any),
          ['Sexomasculino'])),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵeld(0,
          (null as any),(null as any),4,'dd',([] as any[]),(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          [' '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['',''])),(_l()(),i0.ɵted((null as any),[' '])),
      (_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
          3,'dt',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i0.ɵeld(0,(null as any),(null as any),2,'span',[['jhiTranslate',
          'eRestauranteApp.colaborador.documento']],(null as any),(null as any),(null as any),
          i3.View_JhiTranslateComponent_0,i3.RenderType_JhiTranslateComponent)),i0.ɵdid(49152,
          (null as any),0,i4.JhiTranslateComponent,([] as any[]),{jhiTranslate:[0,
              'jhiTranslate']},(null as any)),(_l()(),i0.ɵted((null as any),['Documento'])),
      (_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
          4,'dd',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵeld(0,
          (null as any),(null as any),1,'span',([] as any[]),(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['',''])),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵted((null as any),
          [' '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),3,'dt',([] as any[]),
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),2,'span',[['jhiTranslate','eRestauranteApp.colaborador.telefone']],
          (null as any),(null as any),(null as any),i3.View_JhiTranslateComponent_0,
          i3.RenderType_JhiTranslateComponent)),i0.ɵdid(49152,(null as any),0,i4.JhiTranslateComponent,
          ([] as any[]),{jhiTranslate:[0,'jhiTranslate']},(null as any)),(_l()(),i0.ɵted((null as any),
          ['Telefone'])),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),4,'dd',([] as any[]),(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),
          i0.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),(null as any),
              (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['',''])),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵted((null as any),
          [' '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),3,'dt',([] as any[]),
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),2,'span',[['jhiTranslate','eRestauranteApp.colaborador.email']],
          (null as any),(null as any),(null as any),i3.View_JhiTranslateComponent_0,
          i3.RenderType_JhiTranslateComponent)),i0.ɵdid(49152,(null as any),0,i4.JhiTranslateComponent,
          ([] as any[]),{jhiTranslate:[0,'jhiTranslate']},(null as any)),(_l()(),i0.ɵted((null as any),
          ['Email'])),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),4,'dd',([] as any[]),(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),
          i0.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),(null as any),
              (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['',''])),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵted((null as any),
          [' '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),3,'dt',([] as any[]),
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),2,'span',[['jhiTranslate','eRestauranteApp.colaborador.horario']],
          (null as any),(null as any),(null as any),i3.View_JhiTranslateComponent_0,
          i3.RenderType_JhiTranslateComponent)),i0.ɵdid(49152,(null as any),0,i4.JhiTranslateComponent,
          ([] as any[]),{jhiTranslate:[0,'jhiTranslate']},(null as any)),(_l()(),i0.ɵted((null as any),
          ['Horario'])),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),4,'dd',([] as any[]),(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),
          i0.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),(null as any),
              (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['',''])),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵted((null as any),
          [' '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),3,'dt',([] as any[]),
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),2,'span',[['jhiTranslate','eRestauranteApp.colaborador.preferencia']],
          (null as any),(null as any),(null as any),i3.View_JhiTranslateComponent_0,
          i3.RenderType_JhiTranslateComponent)),i0.ɵdid(49152,(null as any),0,i4.JhiTranslateComponent,
          ([] as any[]),{jhiTranslate:[0,'jhiTranslate']},(null as any)),(_l()(),i0.ɵted((null as any),
          ['Preferencia'])),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵeld(0,
          (null as any),(null as any),4,'dd',([] as any[]),(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          [' '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['',''])),(_l()(),i0.ɵted((null as any),[' '])),
      (_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
          3,'dt',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i0.ɵeld(0,(null as any),(null as any),2,'span',[['jhiTranslate',
          'eRestauranteApp.colaborador.usuario']],(null as any),(null as any),(null as any),
          i3.View_JhiTranslateComponent_0,i3.RenderType_JhiTranslateComponent)),i0.ɵdid(49152,
          (null as any),0,i4.JhiTranslateComponent,([] as any[]),{jhiTranslate:[0,
              'jhiTranslate']},(null as any)),(_l()(),i0.ɵted((null as any),['Usuario'])),
      (_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
          1,'dd',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i0.ɵted((null as any),[' ',' '])),(_l()(),i0.ɵted((null as any),
          [' '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),3,'dt',([] as any[]),
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),2,'span',[['jhiTranslate','eRestauranteApp.colaborador.endereco']],
          (null as any),(null as any),(null as any),i3.View_JhiTranslateComponent_0,
          i3.RenderType_JhiTranslateComponent)),i0.ɵdid(49152,(null as any),0,i4.JhiTranslateComponent,
          ([] as any[]),{jhiTranslate:[0,'jhiTranslate']},(null as any)),(_l()(),i0.ɵted((null as any),
          ['Endereco'])),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),4,'dd',([] as any[]),(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),
          i0.ɵand(16777216,(null as any),(null as any),1,(null as any),View_ColaboradorDetailComponent_2)),
      i0.ɵdid(16384,(null as any),0,i2.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵted((null as any),
          [' '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),3,'dt',([] as any[]),
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),2,'span',[['jhiTranslate','eRestauranteApp.colaborador.cargos']],
          (null as any),(null as any),(null as any),i3.View_JhiTranslateComponent_0,
          i3.RenderType_JhiTranslateComponent)),i0.ɵdid(49152,(null as any),0,i4.JhiTranslateComponent,
          ([] as any[]),{jhiTranslate:[0,'jhiTranslate']},(null as any)),(_l()(),i0.ɵted((null as any),
          ['Cargos'])),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),4,'dd',([] as any[]),(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),
          i0.ɵand(16777216,(null as any),(null as any),1,(null as any),View_ColaboradorDetailComponent_3)),
      i0.ɵdid(802816,(null as any),0,i2.NgForOf,[i0.ViewContainerRef,i0.TemplateRef,
          i0.IterableDiffers],{ngForOf:[0,'ngForOf']},(null as any)),(_l()(),i0.ɵted((null as any),
          [' '])),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵted((null as any),
          [' '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),7,'button',[['class',
          'btn btn-info'],['type','submit']],(null as any),[[(null as any),'click']],
          (_v,en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.previousState()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),
          i0.ɵeld(0,(null as any),(null as any),0,'span',[['class','fa fa-arrow-left']],
              (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
          2,'span',[['jhiTranslate','entity.action.back']],(null as any),(null as any),
          (null as any),i3.View_JhiTranslateComponent_0,i3.RenderType_JhiTranslateComponent)),
      i0.ɵdid(49152,(null as any),0,i4.JhiTranslateComponent,([] as any[]),{jhiTranslate:[0,
          'jhiTranslate']},(null as any)),(_l()(),i0.ɵted((null as any),[' Back'])),
      (_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵted((null as any),[' '])),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),11,'button',[['class','btn btn-primary'],
          ['replaceUrl','true'],['type','button']],(null as any),[[(null as any),'click']],
          (_v,en,$event) => {
            var ad:boolean = true;
            if (('click' === en)) {
              const pd_0:any = ((<any>i0.ɵnov(_v,145).onClick()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),i0.ɵdid(16384,(null as any),0,i1.RouterLink,
          [i1.Router,i1.ActivatedRoute,[8,(null as any)],i0.Renderer2,i0.ElementRef],
          {replaceUrl:[0,'replaceUrl'],routerLink:[1,'routerLink']},(null as any)),
      i0.ɵpod({popup:0}),i0.ɵpod({outlets:0}),i0.ɵpad(2),(_l()(),i0.ɵted((null as any),
          [' '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),0,'span',[['class',
          'fa fa-pencil']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵeld(0,
          (null as any),(null as any),2,'span',[['jhiTranslate','entity.action.edit']],
          (null as any),(null as any),(null as any),i3.View_JhiTranslateComponent_0,
          i3.RenderType_JhiTranslateComponent)),i0.ɵdid(49152,(null as any),0,i4.JhiTranslateComponent,
          ([] as any[]),{jhiTranslate:[0,'jhiTranslate']},(null as any)),(_l()(),i0.ɵted((null as any),
          [' Edit'])),(_l()(),i0.ɵted((null as any),[' '])),(_l()(),i0.ɵted((null as any),
          [' ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = 'eRestauranteApp.colaborador.detail.title';
    _ck(_v,4,0,currVal_0);
    const currVal_2:any = 'eRestauranteApp.colaborador.nome';
    _ck(_v,17,0,currVal_2);
    const currVal_4:any = 'eRestauranteApp.colaborador.nascimento';
    _ck(_v,28,0,currVal_4);
    const currVal_6:any = 'eRestauranteApp.colaborador.sexomasculino';
    _ck(_v,40,0,currVal_6);
    const currVal_8:any = 'eRestauranteApp.colaborador.documento';
    _ck(_v,51,0,currVal_8);
    const currVal_10:any = 'eRestauranteApp.colaborador.telefone';
    _ck(_v,62,0,currVal_10);
    const currVal_12:any = 'eRestauranteApp.colaborador.email';
    _ck(_v,73,0,currVal_12);
    const currVal_14:any = 'eRestauranteApp.colaborador.horario';
    _ck(_v,84,0,currVal_14);
    const currVal_16:any = 'eRestauranteApp.colaborador.preferencia';
    _ck(_v,95,0,currVal_16);
    const currVal_18:any = 'eRestauranteApp.colaborador.usuario';
    _ck(_v,106,0,currVal_18);
    const currVal_20:any = 'eRestauranteApp.colaborador.endereco';
    _ck(_v,114,0,currVal_20);
    const currVal_21:any = _co.colaborador.endereco;
    _ck(_v,120,0,currVal_21);
    const currVal_22:any = 'eRestauranteApp.colaborador.cargos';
    _ck(_v,125,0,currVal_22);
    const currVal_23:any = _co.colaborador.cargos;
    _ck(_v,131,0,currVal_23);
    const currVal_24:any = 'entity.action.back';
    _ck(_v,140,0,currVal_24);
    const currVal_25:any = 'true';
    const currVal_26:any = _ck(_v,148,0,'/',_ck(_v,147,0,_ck(_v,146,0,(('colaborador/' + _co.colaborador.id) + '/edit'))));
    _ck(_v,145,0,currVal_25,currVal_26);
    const currVal_27:any = 'entity.action.edit';
    _ck(_v,153,0,currVal_27);
  },(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_1:any = _co.colaborador.id;
    _ck(_v,6,0,currVal_1);
    const currVal_3:any = _co.colaborador.nome;
    _ck(_v,23,0,currVal_3);
    const currVal_5:any = i0.ɵunv(_v,34,0,_ck(_v,35,0,i0.ɵnov((<any>_v.parent),0),
        _co.colaborador.nascimento,'medium'));
    _ck(_v,34,0,currVal_5);
    const currVal_7:any = _co.colaborador.sexomasculino;
    _ck(_v,46,0,currVal_7);
    const currVal_9:any = _co.colaborador.documento;
    _ck(_v,57,0,currVal_9);
    const currVal_11:any = _co.colaborador.telefone;
    _ck(_v,68,0,currVal_11);
    const currVal_13:any = _co.colaborador.email;
    _ck(_v,79,0,currVal_13);
    const currVal_15:any = _co.colaborador.horario;
    _ck(_v,90,0,currVal_15);
    const currVal_17:any = _co.colaborador.preferencia;
    _ck(_v,101,0,currVal_17);
    const currVal_19:any = ((_co.colaborador.usuario == null)? (null as any): _co.colaborador.usuario.login);
    _ck(_v,110,0,currVal_19);
  });
}
export function View_ColaboradorDetailComponent_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[i0.ɵpid(0,i2.DatePipe,[i0.LOCALE_ID]),(_l()(),i0.ɵted((null as any),
      [' '])),(_l()(),i0.ɵand(16777216,(null as any),(null as any),1,(null as any),
      View_ColaboradorDetailComponent_1)),i0.ɵdid(16384,(null as any),0,i2.NgIf,[i0.ViewContainerRef,
      i0.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),
      [' ']))],(_ck,_v) => {
    var _co:i10.ColaboradorDetailComponent = _v.component;
    const currVal_0:any = _co.colaborador;
    _ck(_v,3,0,currVal_0);
  },(null as any));
}
export function View_ColaboradorDetailComponent_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'jhi-colaborador-detail',
      ([] as any[]),(null as any),(null as any),(null as any),View_ColaboradorDetailComponent_0,
      RenderType_ColaboradorDetailComponent)),i0.ɵdid(245760,(null as any),0,i10.ColaboradorDetailComponent,
      [i8.JhiEventManager,i11.JhiDataUtils,i12.ColaboradorService,i1.ActivatedRoute],
      (null as any),(null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const ColaboradorDetailComponentNgFactory:i0.ComponentFactory<i10.ColaboradorDetailComponent> = i0.ɵccf('jhi-colaborador-detail',
    i10.ColaboradorDetailComponent,View_ColaboradorDetailComponent_Host_0,{},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL2hvbWUvbWZlcm5hbmRlcy9lcmVzdGF1cmFudGUvc3JjL21haW4vd2ViYXBwL2FwcC9lbnRpdGllcy9jb2xhYm9yYWRvci9jb2xhYm9yYWRvci1kZXRhaWwuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL2hvbWUvbWZlcm5hbmRlcy9lcmVzdGF1cmFudGUvc3JjL21haW4vd2ViYXBwL2FwcC9lbnRpdGllcy9jb2xhYm9yYWRvci9jb2xhYm9yYWRvci1kZXRhaWwuY29tcG9uZW50LnRzIiwibmc6Ly8vaG9tZS9tZmVybmFuZGVzL2VyZXN0YXVyYW50ZS9zcmMvbWFpbi93ZWJhcHAvYXBwL2VudGl0aWVzL2NvbGFib3JhZG9yL2NvbGFib3JhZG9yLWRldGFpbC5jb21wb25lbnQuaHRtbCIsIm5nOi8vL2hvbWUvbWZlcm5hbmRlcy9lcmVzdGF1cmFudGUvc3JjL21haW4vd2ViYXBwL2FwcC9lbnRpdGllcy9jb2xhYm9yYWRvci9jb2xhYm9yYWRvci1kZXRhaWwuY29tcG9uZW50LnRzLkNvbGFib3JhZG9yRGV0YWlsQ29tcG9uZW50X0hvc3QuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgIiwiIDxkaXYgKm5nSWY9XCJjb2xhYm9yYWRvclwiPiA8aDI+PHNwYW4gamhpVHJhbnNsYXRlPVwiZVJlc3RhdXJhbnRlQXBwLmNvbGFib3JhZG9yLmRldGFpbC50aXRsZVwiPkNvbGFib3JhZG9yPC9zcGFuPiB7e2NvbGFib3JhZG9yLmlkfX08L2gyPiA8aHI+IDxqaGktYWxlcnQtZXJyb3I+PC9qaGktYWxlcnQtZXJyb3I+IDxkbCBjbGFzcz1cInJvdy1tZCBqaC1lbnRpdHktZGV0YWlsc1wiPiA8ZHQ+PHNwYW4gamhpVHJhbnNsYXRlPVwiZVJlc3RhdXJhbnRlQXBwLmNvbGFib3JhZG9yLm5vbWVcIj5Ob21lPC9zcGFuPjwvZHQ+IDxkZD4gPHNwYW4+e3tjb2xhYm9yYWRvci5ub21lfX08L3NwYW4+IDwvZGQ+IDxkdD48c3BhbiBqaGlUcmFuc2xhdGU9XCJlUmVzdGF1cmFudGVBcHAuY29sYWJvcmFkb3IubmFzY2ltZW50b1wiPk5hc2NpbWVudG88L3NwYW4+PC9kdD4gPGRkPiA8c3Bhbj57e2NvbGFib3JhZG9yLm5hc2NpbWVudG8gfCBkYXRlOidtZWRpdW0nfX08L3NwYW4+IDwvZGQ+IDxkdD48c3BhbiBqaGlUcmFuc2xhdGU9XCJlUmVzdGF1cmFudGVBcHAuY29sYWJvcmFkb3Iuc2V4b21hc2N1bGlub1wiPlNleG9tYXNjdWxpbm88L3NwYW4+PC9kdD4gPGRkPiA8c3Bhbj57e2NvbGFib3JhZG9yLnNleG9tYXNjdWxpbm99fTwvc3Bhbj4gPC9kZD4gPGR0PjxzcGFuIGpoaVRyYW5zbGF0ZT1cImVSZXN0YXVyYW50ZUFwcC5jb2xhYm9yYWRvci5kb2N1bWVudG9cIj5Eb2N1bWVudG88L3NwYW4+PC9kdD4gPGRkPiA8c3Bhbj57e2NvbGFib3JhZG9yLmRvY3VtZW50b319PC9zcGFuPiA8L2RkPiA8ZHQ+PHNwYW4gamhpVHJhbnNsYXRlPVwiZVJlc3RhdXJhbnRlQXBwLmNvbGFib3JhZG9yLnRlbGVmb25lXCI+VGVsZWZvbmU8L3NwYW4+PC9kdD4gPGRkPiA8c3Bhbj57e2NvbGFib3JhZG9yLnRlbGVmb25lfX08L3NwYW4+IDwvZGQ+IDxkdD48c3BhbiBqaGlUcmFuc2xhdGU9XCJlUmVzdGF1cmFudGVBcHAuY29sYWJvcmFkb3IuZW1haWxcIj5FbWFpbDwvc3Bhbj48L2R0PiA8ZGQ+IDxzcGFuPnt7Y29sYWJvcmFkb3IuZW1haWx9fTwvc3Bhbj4gPC9kZD4gPGR0PjxzcGFuIGpoaVRyYW5zbGF0ZT1cImVSZXN0YXVyYW50ZUFwcC5jb2xhYm9yYWRvci5ob3JhcmlvXCI+SG9yYXJpbzwvc3Bhbj48L2R0PiA8ZGQ+IDxzcGFuPnt7Y29sYWJvcmFkb3IuaG9yYXJpb319PC9zcGFuPiA8L2RkPiA8ZHQ+PHNwYW4gamhpVHJhbnNsYXRlPVwiZVJlc3RhdXJhbnRlQXBwLmNvbGFib3JhZG9yLnByZWZlcmVuY2lhXCI+UHJlZmVyZW5jaWE8L3NwYW4+PC9kdD4gPGRkPiA8c3Bhbj57e2NvbGFib3JhZG9yLnByZWZlcmVuY2lhfX08L3NwYW4+IDwvZGQ+IDxkdD48c3BhbiBqaGlUcmFuc2xhdGU9XCJlUmVzdGF1cmFudGVBcHAuY29sYWJvcmFkb3IudXN1YXJpb1wiPlVzdWFyaW88L3NwYW4+PC9kdD4gPGRkPiB7e2NvbGFib3JhZG9yLnVzdWFyaW8/LmxvZ2lufX0gPC9kZD4gPGR0PjxzcGFuIGpoaVRyYW5zbGF0ZT1cImVSZXN0YXVyYW50ZUFwcC5jb2xhYm9yYWRvci5lbmRlcmVjb1wiPkVuZGVyZWNvPC9zcGFuPjwvZHQ+IDxkZD4gPGRpdiAqbmdJZj1cImNvbGFib3JhZG9yLmVuZGVyZWNvXCI+IDxhIFtyb3V0ZXJMaW5rXT1cIlsnL2VuZGVyZWNvJywgY29sYWJvcmFkb3IuZW5kZXJlY28/LmlkXVwiPnt7Y29sYWJvcmFkb3IuZW5kZXJlY28/LmlkfX08L2E+IDwvZGl2PiA8L2RkPiA8ZHQ+PHNwYW4gamhpVHJhbnNsYXRlPVwiZVJlc3RhdXJhbnRlQXBwLmNvbGFib3JhZG9yLmNhcmdvc1wiPkNhcmdvczwvc3Bhbj48L2R0PiA8ZGQ+IDxzcGFuICpuZ0Zvcj1cImxldCBjYXJnb3Mgb2YgY29sYWJvcmFkb3IuY2FyZ29zOyBsZXQgbGFzdCA9IGxhc3RcIj4gPGEgW3JvdXRlckxpbmtdPVwiWycvY2FyZ28nLCBjYXJnb3M/LmlkIF1cIj57e2Nhcmdvcy5pZH19PC9hPnt7bGFzdCA/ICcnIDogJywgJ319IDwvc3Bhbj4gPC9kZD4gPC9kbD4gPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgKGNsaWNrKT1cInByZXZpb3VzU3RhdGUoKVwiIGNsYXNzPVwiYnRuIGJ0bi1pbmZvXCI+IDxzcGFuIGNsYXNzPVwiZmEgZmEtYXJyb3ctbGVmdFwiPjwvc3Bhbj4mbmJzcDs8c3BhbiBqaGlUcmFuc2xhdGU9XCJlbnRpdHkuYWN0aW9uLmJhY2tcIj4gQmFjazwvc3Bhbj4gPC9idXR0b24+IDxidXR0b24gdHlwZT1cImJ1dHRvblwiIFtyb3V0ZXJMaW5rXT1cIlsnLycsIHsgb3V0bGV0czogeyBwb3B1cDogJ2NvbGFib3JhZG9yLycrIGNvbGFib3JhZG9yLmlkICsgJy9lZGl0J30gfV1cIiByZXBsYWNlVXJsPVwidHJ1ZVwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+IDxzcGFuIGNsYXNzPVwiZmEgZmEtcGVuY2lsXCI+PC9zcGFuPiZuYnNwOzxzcGFuIGpoaVRyYW5zbGF0ZT1cImVudGl0eS5hY3Rpb24uZWRpdFwiPiBFZGl0PC9zcGFuPiA8L2J1dHRvbj4gPC9kaXY+ICIsIjxqaGktY29sYWJvcmFkb3ItZGV0YWlsPjwvamhpLWNvbGFib3JhZG9yLWRldGFpbD4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQ0FtK0M7TUFBQSx3RUFBa0M7YUFBQSx1QkFBQztNQUFBO01BQUE7UUFBQTtRQUFBO1VBQUE7Y0FBQTtVQUFBO1FBQUE7UUFBQTtNQUFBLHVDQUFBO01BQUE7TUFBQSxzQkFBRyxJQUF1RCx3Q0FBZ0M7TUFBQTs7SUFBdkY7SUFBSCxXQUFHLFNBQUg7OztJQUFBO0lBQUE7SUFBQSxXQUFBLG1CQUFBO0lBQTBEO0lBQUE7Ozs7b0JBQWtJO01BQUEsd0VBQWlFO2FBQUEsdUJBQUM7TUFBQTtNQUFBO1FBQUE7UUFBQTtVQUFBO2NBQUE7VUFBQTtRQUFBO1FBQUE7TUFBQSx1Q0FBQTtNQUFBO01BQUEsc0JBQUcsSUFBdUMsd0NBQWlCO01BQUE7SUFBeEQ7SUFBSCxXQUFHLFNBQUg7O0lBQUE7SUFBQTtJQUFBLFdBQUEsbUJBQUE7SUFBMEM7SUFBQTtJQUFpQjtJQUFBOzs7O29CQUE5ekQ7TUFBQSx3RUFBeUI7YUFBQSx1QkFBQztNQUFBO01BQUEsZ0JBQUk7TUFBQTt5RUFBQSxVQUFBO01BQUE7TUFBQSxlQUE4RCxnREFBa0I7TUFBQSxXQUF3QixzQ0FBQztNQUFBO01BQUEsOEJBQUksc0NBQUM7YUFBQTtVQUFBO2FBQUE7Z0RBQUEsK0JBQW1DO2lCQUFBLHVCQUFDO1VBQUE7VUFBQSw0Q0FB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