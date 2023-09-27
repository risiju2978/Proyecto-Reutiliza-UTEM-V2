import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { Categoria } from 'src/app/interfaces/categoria';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { CallServicesService } from './../../../../services/call-services.service';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit, AfterViewInit, OnDestroy {
  categoriaForm: FormGroup;
  validateForm: boolean;
  public categorias = [];
  

  /** control for the selected categoria 
   * bankCtrl.value?.name
  */
  public categoriasCtrl: FormControl = new FormControl();

  public categoriasFilterCtrl: FormControl = new FormControl();

  public filteredCategorias: ReplaySubject<Categoria[]> = new ReplaySubject<Categoria[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  
  protected _onDestroy = new Subject<void>();

  constructor(
    private callServicesService: CallServicesService,
  ) { }

  ngOnInit() {
    this.validateForm = false;
    this.categoriaForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl('')
    });
    this.getCategorias()

    // listen for search field value changes
    this.categoriasFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCategorias();
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  validateFormFunction() {
    if (this.categoriaForm.valid) {
      this.validateForm = true;
      return;
    }
  }

  getCategorias(){
    this.callServicesService.getAllCategorias()
    .subscribe(response =>{
          this.categorias = response
          // set initial selection
          this.categoriasCtrl.setValue(this.categorias);
          // load the initial bank list
          this.filteredCategorias.next(this.categorias.slice());
    });
  }

  submitFormCategoria(){
    if (!this.validateForm) {
      return
    }
    var formData: any = new FormData();
    formData.append("name", this.categoriaForm.get('name').value);
    formData.append("description", this.categoriaForm.get('description').value);

    this.callServicesService.addCategoria(formData).subscribe(
      (response) => {
        this.categoriaForm.reset()
        this.getCategorias();
        alert(response.message)
      },
      (error) => {
        alert(error.error.message)
      }
    )
  }

  eliminarCategoria(){
    if (this.categoriasCtrl.value.id === undefined) {
      alert("No ha seleccionado una categoria")
      return null
    }
    this.callServicesService.deleteCategoria(this.categoriasCtrl.value.id).subscribe(
      (response) => {
        // eliminar el elemento de la lista
        let index = this.categorias.findIndex(x => x.id ===17)
        this.categorias.splice(index, 1);
        this.categoriasCtrl.setValue(this.categorias);
        this.filteredCategorias.next(this.categorias.slice());
        alert(response.message)
      },
      (error) => {
        alert(error.error.message)
      }
    )
  }

  protected setInitialValue() {
    this.filteredCategorias
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Categoria, b: Categoria) => a && b && a.id === b.id;
      });
  }

  protected filterCategorias() {
    if (!this.categorias) {
      return;
    }
    // get the search keyword
    let search = this.categoriasFilterCtrl.value;
    if (!search) {
      this.filteredCategorias.next(this.categorias.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredCategorias.next(
      this.categorias.filter(c => c.name.toLowerCase().indexOf(search) > -1)
    );
  }

}
