import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SendMessageService } from 'src/app/services/send-message.service';
import { SaveService } from 'src/app/services/save.service';
@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  constructor(
    public service:SendMessageService,
    public saveData: SaveService
  ) { }

  loading: any;
  form = new FormGroup({
    var1: new FormControl('', [Validators.required]),
    var2: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    plantilla: new FormControl('variables', [Validators.required]),
  })

  ngOnInit(): void {
  }

  submit(){
    this.form.value.plantilla = "variables";
    if(this.form.valid){

      this.form.disable()
      this.loading = true;


      let data = {
        messaging_product: "whatsapp",
        to: "57" + this.form.value.phone,
        type: "template",
        template: {
            name: this.form.value.plantilla,
            language: {
              code: "es"
            },
            components: [
                {
                    type: "body",
                    parameters: [
                        {
                          type: "text",
                          text: this.form.value.var1
                        },
                        {
                          type: "text",
                          text: this.form.value.var2
                        }
                    ]
                }
            ]
        }
      }

      this.service.send(data).subscribe({
        next: (req:any) => {
          this.saveDatabase(req);
          console.log(req)
          alert('Enviado Correctamente');
        },
        error: (err: string) => {
          console.log(err)
          this.loading = false;
          alert(err);
        },
        complete: () => {
        },
      });

    }
  }

  saveDatabase(req:any) {

    let json = {
      res :req,
      variables: [
        {var1 : this.form.value.var1},
        {var2 : this.form.value.var2},
      ]
    }

    let data  = {
      to: this.form.value.phone,
      message: this.form.value.plantilla,
      json: JSON.stringify(json),
    }
    this.saveData.create(data).subscribe({
      next: (req:any) => {
        console.log(req)
      },
      error: (err: string) => {
        console.log(err)
        this.loading = false;
        alert(err);
      },
      complete: () => {
        this.form.enable();
        this.loading = false;
        this.form.reset();
      },
    });
  }

}
