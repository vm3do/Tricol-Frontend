import { Directive, Input, TemplateRef, ViewContainerRef, inject, OnInit } from '@angular/core';
import { PermissionService } from '../services/permission';

@Directive({
  selector: '[appHasPermission]',
})
export class HasPermissionDirective implements OnInit {
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly permissionService = inject(PermissionService);

  @Input('appHasPermission') permission: string | string[] = '';

  ngOnInit(): void {
    const permissions = Array.isArray(this.permission) ? this.permission : [this.permission];
    const hasAccess = permissions.some((p) => this.permissionService.hasPermission(p));

    if (hasAccess) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
