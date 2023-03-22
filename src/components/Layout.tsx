import Header from "./Header";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-primary">
      <Header />
      <div>{children}</div>
    </div>
  );
}
